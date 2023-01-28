
let createBtn = document.querySelector(".button");
let downloadBtn = document.querySelector(".download");
let input = document.querySelector(".text");
let img = document.querySelector(".image");

// creates a qr code from the value of the input field and shows it
async function createQRCode() {
	let text = input.value;

	return fetch("/post-qr", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({data: text})
	}).then(async(res) => {
		let buffer = await res.arrayBuffer();
		var base64 = btoa(
			new Uint8Array(buffer)
			  .reduce((data, byte) => data + String.fromCharCode(byte), "")
		  );
		img.src = "data:image/png;base64," + base64;
		img.dataset.text = text;
	})
}

createBtn.addEventListener("click", async () => {
	// no need to create empty qr codes
	if(input.value === ""){
		return;
	}

	await createQRCode();
})

downloadBtn.addEventListener("click", async () => {
	let text = input.value;

	// no need to download empty codes
	if (text === "") {
		return;
	}

	// check whether the generated code is up-to-date with what is in the input field
	if (img.dataset.text != text) {
		await createQRCode();
	}
	
	// download the code
	let a = document.createElement("a");
	a.href = img.src;
	a.download = "code.png";
	document.body.appendChild(a);
	a.click()
	document.body.removeChild(a);
})