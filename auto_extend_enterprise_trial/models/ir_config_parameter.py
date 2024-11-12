# -*- coding: utf-8 -*-
from odoo import api, fields, models, _
from dateutil.relativedelta import relativedelta
from datetime import datetime


class IrConfigParameter(models.Model):
    _inherit = "ir.config_parameter"

    @api.model
    def extend_trial_period_by_month(self, extend_month):
        new_expiration_date = str(datetime.now() + relativedelta(months=extend_month))
        self.sudo().set_param("database.expiration_date", new_expiration_date)
        return True
