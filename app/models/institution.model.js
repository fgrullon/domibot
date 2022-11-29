module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      ministerio: String,
      direccion: String,
      horario: String,
      telefono: String,
      link: String,
      correo: String,
      servicios: Array
    }
  );


  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Institution = mongoose.model("Ministerios", schema);
  return Institution;
};

