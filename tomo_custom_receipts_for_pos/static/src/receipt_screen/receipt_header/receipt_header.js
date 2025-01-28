import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";


patch(PosStore.prototype, {
    getReceiptHeaderData(order) {
        const result = super.getReceiptHeaderData(...arguments);
        if (order && order.partner_id && order.partner_id.name) {
            result.partner = order.partner_id.name;
        }
        return result;
    },
});
