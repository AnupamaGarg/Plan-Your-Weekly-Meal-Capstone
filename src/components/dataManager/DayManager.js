const remoteURL = "http://localhost:5002";

export default {
  
  getAll() {
    return fetch(`${remoteURL}/days`).then(e => e.json());
  }
};