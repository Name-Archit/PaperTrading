const prisma =
  require("../config/db");

exports.getTransactions =
  async (req, res) => {

    try {

      const transactions =
        await prisma.transaction.findMany({
          where: {
            userId:
              req.user.userId
          },

          orderBy: {
            createdAt: "desc"
          }
        });

      res.json(transactions);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });
    }
};