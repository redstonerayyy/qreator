let button = document.querySelector(".button");
let input = document.querySelector(".text");
let img = document.querySelector(".image");
let dbutton = document.querySelector(".download");

button.addEventListener("click", (ev) => {
	if(input.value === ""){
		return;
	}

	fetch("/post-qr", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({data: input.value})
	}).then(async(res) => {
		let buffer = await res.arrayBuffer();
		var base64 = btoa(
			new Uint8Array(buffer)
			  .reduce((data, byte) => data + String.fromCharCode(byte), '')
		  );
		img.src = 'data:image/png;base64,' + base64;
	})
})

dbutton.addEventListener("click", (ev) => {
	if(new URL(img.src).pathname == "/"){
		return;
	}
	
	console.log(new URL(img.src).pathname);

	let a = document.createElement('a');
	a.href = img.src;
	a.download = "code.png";
	document.body.appendChild(a);
	a.click()
	document.body.removeChild(a);
})