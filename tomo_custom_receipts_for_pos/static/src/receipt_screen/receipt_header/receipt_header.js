import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    getReceiptHeaderData(order) {
        const result = super.getReceiptHeaderData(...arguments);
        const partner_rec = order.get_partner()
        if (partner_rec && partner_rec.name) {
            result.partner = partner_rec.name;
        }
        return result;
    },
});
