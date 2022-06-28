const fs = require("fs");

 class Contenedor {
  constructor(namefile) {
    this.namefile = namefile;
  }
  async save(obj) {
    try {
      let content = await fs.promises.readFile(this.namefile, "utf8");
      if (content != "") {
        let contentObj = JSON.parse(content);
        let lastId = contentObj.at(-1).id;
        obj.id = lastId + 1;
        contentObj.push(obj);
        await fs.promises.writeFile(this.namefile, JSON.stringify(contentObj));

        return obj;
      } else {
        obj.id = 0;
        await fs.promises.appendFile(this.namefile, JSON.stringify([obj]));
        return obj;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      let content = await fs.promises.readFile(this.namefile, "utf8");
      if (content != "") {
        const contentObj = JSON.parse(content);
        let obj = null;
        obj = contentObj.filter((o) => o.id == id);
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let content = await fs.promises.readFile(this.namefile, "utf8");
      if (content != "") {
        let contentObj = JSON.parse(content);
        return contentObj;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      let content = await fs.promises.readFile(this.namefile, "utf8");
      if (content != "") {
        const contentObj = JSON.parse(content);
        let obj = null;
        obj = contentObj.filter((o) => o.id != id);
        await fs.promises.writeFile(this.namefile, JSON.stringify(obj));
        return `borrando ${id}...`;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.namefile, "");
      return "eliminado";
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports= {
    Content:Contenedor
}