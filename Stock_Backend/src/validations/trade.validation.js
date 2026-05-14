const { z } = require("zod");

exports.tradeSchema = z.object({

  symbol:
    z.string().min(1),

  quantity:
    z.number().positive()
});