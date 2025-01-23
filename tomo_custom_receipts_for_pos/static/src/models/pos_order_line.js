import { patch } from "@web/core/utils/patch";
import { PosOrderline } from "@point_of_sale/app/models/pos_order_line";

patch(PosOrderline.prototype, {
    set_pos_order_line_number() {
        const currentOrder = this.order_id;
        if (!currentOrder) {
            return '';
        }

        const allOrderLines = currentOrder.get_orderlines();
        const currentLinePosition = allOrderLines.indexOf(this);
        let lineNumberDisplay = '';
        if (currentLinePosition >= 0) {
            const lineNumber = currentLinePosition + 1;
            lineNumberDisplay = lineNumber.toString() + '.';
        }

        return lineNumberDisplay;
    },

    getDisplayData() {
        const result = super.getDisplayData(...arguments);
        result.POSOrderLineNumber = this.set_pos_order_line_number();
        return result;
    },

});