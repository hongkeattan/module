# -*- coding: utf-8 -*-
from odoo.models import AbstractModel


class PublisherWarrantyContract(AbstractModel):
    _inherit = "publisher_warranty.contract"

    def update_notification(self, cron_mode=True):
        """
        Inherit function and auto-extend the trial by 6 months
        """
        if (
            not self.env["ir.config_parameter"]
            .sudo()
            .get_param("database.expiration_date")
        ):
            super(PublisherWarrantyContract, self).update_notification(
                cron_mode=cron_mode
            )
        elif (
            self.env["ir.config_parameter"]
            .sudo()
            .get_param("database.expiration_reason")
            == "trial"
        ):
            self.env["ir.config_parameter"].extend_trial_period_by_month(6)
            return True
        else:
            super(PublisherWarrantyContract, self).update_notification(
                cron_mode=cron_mode
            )
