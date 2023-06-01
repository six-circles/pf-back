const Order = require("../../models/Order")

function updateStatus(input, userId, status) {
  // Separar las entradas en un array
  let entries = input.split(';');

  // Buscar la entrada que coincida con el userId y actualizar el status
  let updated = false;
  entries = entries.map(entry => {
    const [id, currentStatus] = entry.split(':');
    if (id === userId) {
      updated = true;
      return `${id}:${status}`;
    } else {
      return entry;
    }
  });

  // Si no se encontró una entrada para el userId, agregar una nueva
  if (!updated) {
    entries.push(`${userId}:${status}`);
  }

  // Devolver la cadena de texto actualizada
  return entries.join(';');
}

const updateDelivery = async (req, res) => {
  // El status debería ser 0, 1 o 2. 0 para pendiente, 1 para en proceso y 2 para entregado.
  const { vendorId, status } = req.body;
  try {
    if (status === undefined || !req.params.id) {
      throw Error("Faltan datos");
    }
    const order = await Order.findById(req.params.id);
    const orderStatus = order.status;
    await Order.findByIdAndUpdate(req.params.id, { status: updateStatus(orderStatus, vendorId, status) });
    res.status(200).json({ message: "Producto modificado" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
module.exports = updateDelivery;
