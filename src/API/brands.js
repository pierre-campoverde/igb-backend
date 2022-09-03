const { db } = require("../utils/admin");
const { index } = require("../utils/algolia");
exports.getAllBrands = (req, res) => {
  db.collection("brands")
    .get()
    .then((data) => {
      let brands = [];
      data.forEach((doc) => {
        brands.push({
          brandId: doc.id,
          denominacion: doc.data().denominacion,
          clase: doc.data().clase,
          pagina: doc.data().pagina,
          gazeta: doc.data().gazeta,
          numeroExpediente: doc.data().numeroExpediente,
        });
      });
      return res.json(brands);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getOneBrand = (request, response) => {
  const docRef = db.collection("brands").doc(request.params.id);
  docRef.get().then((doc) => {
    if (doc.exists) {
      return response.json(doc.data());
    } else {
      return response.status(404).send("Item dont found");
    }
  });
};

exports.deleteBrand = (request, response) => {
  const docRef = db.collection("brands").doc(request.params.id);
  docRef
    .delete()
    .then(() => {
      index.deleteObject(request.params.id);
    })
    .then(() => {
      return response
        .status(200)
        .json({ message: `${request.params.id} deleted` });
    })
    .catch((error) => {
      return response.status(500).send(error);
    });
};
exports.postOneBrand = (request, response) => {
  if (request.body.denominacion.trim() === "") {
    return response
      .status(400)
      .json({ denominación: "No tiene que estar vacia" });
  }
  if (request.body.clase.trim() === "") {
    return response.status(400).json({ clase: "No tiene que estar vacia" });
  }
  if (request.body.pagina.trim() === "") {
    return response.status(400).json({ pagina: "No tiene que estar vacia" });
  }
  if (request.body.gazeta.trim() === "") {
    return response.status(400).json({ gazeta: "No tiene que estar vacia" });
  }
  if (request.body.numeroExpediente.trim() === "") {
    return response
      .status(400)
      .json({ numeroExpediente: "No tiene que estar vacia" });
  }
  const newBrandItem = {
    denominacion: request.body.denominacion,
    clase: request.body.clase,
    pagina: request.body.pagina,
    gazeta: request.body.gazeta,
    numeroExpediente: request.body.numeroExpendiente,
  };
  db.collection("brands")
    .add(newBrandItem)
    .then((doc) => {
      const responseBrandItem = newBrandItem;
      responseBrandItem.id = doc.id;
      return response.json(responseBrandItem);
    })
    .then()
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.log(err);
    });
};
exports.updateOneBrand = (request, response) => {
  const data = request.body;
  const docRef = db.collection("brands").doc(request.params.id);
  console.log();
  docRef
    .set({
      Denominacion: data.Denominacion,
      Clase: parseInt(data.Clase),
      Pagina: parseInt(data.Pagina),
      Gazeta: parseInt(data.Gazeta),
    })
    .then(() => {
      index.saveObject(data);
    })
    .then((res) => {
      return response
        .status(200)
        .json({ message: "Content updated successfully" });
    })
    .catch((error) => {
      return response.status(500).send(error);
    });
};
//This method is for development only
exports.deleteBrands = (request, response) => {
  const data = request.body.items;
  Promise.all(
    data.map((item) => {
      db.collection("brands").doc(item).delete();
    })
  )
    .then(index.deleteObjects(data))
    .then(() => {
      return response.status(200).send("Records deleted");
    })
    .catch((error) => {
      console.log(error);
      return response.status(500).send("Error");
    });
};
//POST BRANDS
exports.postManyBrands = async (request, response) => {
  const data = request.body;

  const formatedData = data.map((item) => {
    return { ...item, objectID: item.Tramite };
  });
  Promise.all(
    formatedData.map((item) => {
      db.collection("brands").doc(item.objectID).set({
        Denominacion: item.Denominacion,
        Clase: item.Clase,
        Pagina: item.Pagina,
        Gazeta: item.Gazeta,
      });
    })
  )
    .then(index.saveObjects(formatedData).wait())
    .then(() => {
      return response.status(200).json({ message: "It works" });
    })
    .catch((error) => {
      console.log(error);
      return response.status(500);
    });
};
