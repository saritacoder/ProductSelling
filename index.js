
function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      sellprice: parseFloat(event.target.sellingPrice.value),
      product: event.target.product.value,
    };
  
    axios
      .post("https://crudcrud.com/api/0d80570515134ea3b55c4efaa01fb469/productSell", userDetails)
      .then((response) => {
        displayUserOnScreen(response.data);
        updateTotalValue(response.data.sellprice);
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("sellingPrice").value = "";
    document.getElementById("product").value = "";
  }
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.textContent = `${userDetails.sellprice} - ${userDetails.product}`;
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Product";
    userItem.appendChild(deleteBtn);
  
    const userList = document.getElementById("product-list");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      axios
        .delete(`https://crudcrud.com/api/0d80570515134ea3b55c4efaa01fb469/productSell/${userDetails._id}`)
        .then((response) => {
          userList.removeChild(userItem);
          updateTotalValue(-userDetails.sellprice);
        })
        .catch((error) => console.log(error));
    });
  }
  
  function updateTotalValue(amount) {
    const totalValueElement = document.getElementById("total-value");
    let currentTotal = parseFloat(totalValueElement.textContent.split("Rs ")[1]);
    currentTotal += amount;
    totalValueElement.textContent = `Total Value Worth of Products: Rs ${currentTotal.toFixed(2)}`;
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/0d80570515134ea3b55c4efaa01fb469/productSell")
      .then((response) => {
        response.data.forEach((userDetails) => {
          displayUserOnScreen(userDetails);
          updateTotalValue(userDetails.sellprice);
        });
      })
      .catch((error) => console.log(error));
  });
  