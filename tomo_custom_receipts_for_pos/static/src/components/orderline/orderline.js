import { patch } from "@web/core/utils/patch";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";

patch(Orderline, {
    props: {
        ...Orderline.props,
        line: {
            type: Object,
            shape: {
                ...Orderline.props.line.shape,
                POSOrderLineNumber: { type: String, optional: true }
            }
        }
    },

    defaultProps: {
        ...Orderline.defaultProps,
        POSOrderLineNumber: false
    }
});
