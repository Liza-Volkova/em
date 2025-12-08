const Request1 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success request1');
	}, 100)
});

const Request2 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success request2');
	}, 100)
});

// через async/await
(async () => {
	const result1 = await Request1();
	console.log(result1);
	const result2 = await Request2();
	console.log(result2);
})();

// Через .then
Request1()
    .then(result1 => {
        console.log(result1);
        return Request2();
    })
    .then(result2 => {
        console.log(result2);
    });
