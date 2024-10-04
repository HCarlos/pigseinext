
class ClaseGeneral {

  _token = "";
  _token_refresh = "";

  constructor(data) {
    if (ClaseGeneral.instance) {
      return ClaseGeneral.instance;
    }
    ClaseGeneral.instance = this;
    this.data = data;

    // if (data.getItem("_handleCheck") === "" ||
    //     data.getItem("_handleCheck") == null ||
    //     data.getItem("_handleCheck") === undefined ){
    //     this.setToken(data.getItem("_handleCheck"))
    //     this.setTokenRefresh(data.getItem("_handleCheck_rt"))
    // }

  }

  getData() {
    return this.data;
  }

  getEncebezadoPost(auth){
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth
      }
    };
  }

  getToken() {
    return this._token;
  }

  setToken(value) {
    this._token = value;
  }

  getTokenRefresh() {
    return this._token_refresh;
  }

  setTokenRefresh(value) {
    this._token_refresh = value;
  }

}

export default ClaseGeneral;