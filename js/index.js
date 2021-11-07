const firstModal = app.modal({
    title: 'First modal',
    content: `
        <h4>Modal Is working</h4>
        <p>lorem5dasda asdasd ASdas</p>`,
    width: '600px',
    buttons: [
        {
            text: 'Отмена',
            cssClassBtn: 'modal__btn',
            cssClassForWrap: 'class-2',
            handler(){
                console.log('Кнопка отмены')
                firstModal.close();
            }
        },
        {
            text: 'Ок',
            cssClassBtn: 'modal__btn',
            cssClassForWrap: 'class-1',
            handler(){
                console.log('Кнопка окей')
            }
        }
    ]
});

const openModalBtn = document.querySelector('#firstModalBtn');
openModalBtn.onclick = firstModal.open;

