const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/groceries/${id}`).then(e => e.json());
  },
  getAll() {

    let parsedUserId = JSON.parse(sessionStorage.getItem("userInfo"))
    let activeUserId= parsedUserId.userId
    let groceryGetAll = `${remoteURL}/groceries?userId=${activeUserId}&_expand=type`
    
    return fetch(groceryGetAll).then(e => e.json());
    // return fetch(`${remoteURL}/groceries?userId=${activeUserId}&_expand=type`).then(e => e.json());
  },
  post(newGrocery) {
    return fetch(`${remoteURL}/groceries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGrocery)
    })
    .then(e => e.json());
  },
  delete(id){
    return fetch(`${remoteURL}/groceries/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json"
        }
    }).then(e=>e.json())
  },

  put(groceryId, existingGrocery) {
    return fetch(`${remoteURL}/groceries/${groceryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(existingGrocery)
    }).then(data => data.json());
  }
};
