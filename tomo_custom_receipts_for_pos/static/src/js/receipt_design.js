/** @odoo-module */
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
import { patch } from "@web/core/utils/patch";
import { useState, Component, xml } from "@odoo/owl";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";
import { OrderWidget } from "@point_of_sale/app/generic_components/order_widget/order_widget";
import { ReceiptHeader } from "@point_of_sale/app/screens/receipt_screen/receipt/receipt_header/receipt_header";
import { useService } from "@web/core/utils/hooks";
import { omit } from "@web/core/utils/objects";
import { PosStore } from "@point_of_sale/app/store/pos_store";


patch(OrderReceipt.prototype, {
    setup(){
        super.setup();
        this.state = useState({
            template: true,
        })
        this.pos = useState(useService("pos"));
        const templateProps = {
            data: this.props.data,
            order: this.pos.get_order(),
            receipt: this.pos.get_order().export_for_printing(),
            orderlines: this.pos.get_order().get_orderlines(),
            paymentlines: this.pos.get_order().export_for_printing().paymentlines
        };
    },
    get templateProps() {
        return {
            data: this.props.data,
            order: this.pos.get_order(),
            receipt: this.pos.get_order().export_for_printing(),
            orderlines: this.pos.get_order().get_orderlines(),
            paymentlines: this.pos.get_order().export_for_printing().paymentlines
        };
    },
    get templateComponent() {
        var mainRef = this;
        return class extends Component {
            setup() {}
            static template = xml`${mainRef.pos.config.design_receipt}`
            static components = {
                Orderline,
                OrderWidget,
                ReceiptHeader,
            };
            omit(...args) {
                return omit(...args);
            }
            doesAnyOrderlineHaveTaxLabel() {
                return this.props.data.orderlines.some((line) => line.taxGroupLabels);
            }
            getPortalURL() {
                return `${this.props.data.base_url}/pos/ticket`;
            }
        };
    },
    get isTrue() {
        if (this.env.services.pos.config.is_custom_receipt == false) {
            return true;
        }
        return false;
    }
});
