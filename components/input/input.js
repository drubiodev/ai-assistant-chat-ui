const messageText = "";
const files = [];

const sendMessage = () =>
{
    $emit("send-message", { text: messageText, files: files });

    // Clear the preview while `$refs['img-preview']` still points at the live
    // node. Mutating reactive state (messageText) below triggers a re-render,
    // after which `$refs` returns a stale/detached node.
    $refs['img-preview'].innerHTML = '';

    messageText = ""; // Clear the input field after sending
    files.length = 0; // Clear the files array after sending
};


const addAttachment = () =>
{
    console.log("Add attachment button clicked");
    $refs.fileInput.click()
};

const onFileSelected = (event) =>
{
    files = event.target.files;

    // show preview of file
    const imgPreview = $refs['img-preview'];
    imgPreview.innerHTML = '';

    for (let i = 0; i < files.length; i++)
    {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) =>
        {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 30;
            imgPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
};