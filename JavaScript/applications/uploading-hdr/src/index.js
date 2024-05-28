import { v4 as uuidv4 } from "uuid";

// Selecting elements
const fileInput = document.getElementById("file-input");
const imageContainer = document.getElementById("image-container");
const submitButton = document.getElementById("submit-button");
const form = document.getElementById("upload-form");
const inputWrapper = document.getElementById("input-wrapper");
const apiKeyInput = document.getElementById("api-key-input");

// Render images to the UI after choosing them in the uploader
if (fileInput) {
  fileInput.addEventListener("change", function (e) {
    const files = e.target.files;
    imageContainer.innerHTML = "";
    if (files.length > 0) {
      submitButton.style.display = "block";
      fileInput.style.display = "none";
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        const img = document.createElement("img");
        img.style.width = "100%";
        img.src = reader.result;

        imageContainer.appendChild(img);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  });
}

// Error handling
const showErrorMessage = () => {
  const element = document.createElement("p");
  element.classList.add("error");
  element.innerHTML = "Your API key is invalid";
  inputWrapper.appendChild(element);
};

const hideErrorMessage = () => {
  const element = inputWrapper.querySelector(".error");
  if (element) {
    inputWrapper.removeChild(element);
  }
};

apiKeyInput.addEventListener("change", () => {
  hideErrorMessage();
});

// Function that creates and uploads an image
const uploadImage = async (apiKey, orderId, file) => {
  const createImageResponse = await fetch(
    "https://api.autoenhance.ai/v3/images/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        image_name: file.name,
        contentType: file.type,
        order_id: orderId,
        hdr: true,
      }),
    }
  );
  if (!createImageResponse.ok) {
    showErrorMessage();
    return;
  }

  const { s3PutObjectUrl } = await createImageResponse.json();

  if (s3PutObjectUrl) {
    const uploadImageResponse = await fetch(s3PutObjectUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "x-api-key": apiKey,
      },
      body: file,
    });
  }
};

// Handle submitting form
form &&
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const files = formData.getAll("images");
    const apiKey = formData.get("api-key");
    const orderId = uuidv4();

    if (apiKey === "") {
      showErrorMessage();
      return;
    }

    submitButton.style.background = "rgba(35, 33, 117, 0.5)";
    submitButton.style.pointerEvents = "none";

    const promises = files.map((file) => uploadImage(apiKey, orderId, file));

    await Promise.all(promises);

    submitButton.style.display = "none";

    const mergeResponse = await fetch(
      `https://api.autoenhance.ai/v3/orders/${orderId}/merge`,
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    const link = document.createElement("a");
    link.href = `https://app.autoenhance.ai/orders/${orderId}?images=${files.length}`;
    link.target = "blank";
    link.rel = "_noreferrer";
    link.classList.add("orderLink");
    link.innerHTML = "Visit the order";

    document.getElementById("content").appendChild(link);
  });
