const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userComprador: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userVendedor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shoppingCart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    /* El status va a tener la siguiente forma: "userId:status;...", donde userId es el id del usuario y status es el estado del pedido (0, 1, 2, 3).
    *  0: Pendiente.
    *  1: En proceso.
    *  2: Enviado.
    *  Por ejemplo: "f78s7d8f98:0;j234hjjsdf23:2" significa que el pedido del usuario con id "f78s7d8f98" está pendiente y que el pedido del usuario con id "j234hjjsdf23" está enviado.
    */
    status: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);
module.exports = model("Order", orderSchema);
