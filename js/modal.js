app.modal = function (options) {

    const cssOpenClose = 'open-d-modal';

    const $modal = _createModal(options);

    const destroed = false;

    function _createModal(options) {
        const modal = document.createElement('div');
        modal.classList.add('d-modal');
        modal.insertAdjacentHTML('afterbegin',  `
            <div class="d-modal__overlay" data-modal-close="true">
                <div class="d-modal__window" style="width:${options.width || '600px'};">
                    <div class="d-modal__wrapper">
                        <div class="d-modal__header">
                            ${options.title || 'Modal title'}
                        </div>
                        <div class="d-modal__body">
                            <div class="d-modal__content" data-modal-content>
                                ${options.content || 'Modal content'}
                            </div>
                        </div>
                        <div class="d-modal__close" data-modal-close="true"></div>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);

        return modal;
    };

    function doNothing(){};

    function _createModalBtns(option = []){
        if(option.length === 0){
            return document.createElement('div');
        }

        const $wrap = document.createElement('div');
        $wrap.classList.add('d-modal__action');

        option.forEach(btn => {
            let btnWrap = document.createElement('div');
            btn.cssClassForWrap ? btnWrap.classList.add(btn.cssClassForWrap) : btnWrap.classList.add('modal__btn-wrap');
            let btnHtml = document.createElement('button');
            btnHtml.textContent = btn.text;
            btn.cssClassBtn ? btnHtml.classList.add(btn.cssClassBtn) : btnHtml.classList.add('modal__btn_default');
            btnWrap.append(btnHtml);
            $wrap.append(btnWrap);

            //события кнопки
            btnHtml.onclick = btn.handler || doNothing
        });

        return $wrap;
    };

    //Создание футера модального окна с кнопками
    const modalFooter = _createModalBtns(options.buttons);
    const parentModalFooter = $modal.querySelector('.d-modal__body');
    const beforeModalFooter = $modal.querySelector('.d-modal__content');
    parentModalFooter.insertBefore(modalFooter, beforeModalFooter.nextSibling);

    let closingModal = false;

    const ANIMATION_SPEED = 200;

    //классы анимации закрытия
    const cssHide = 'hide-d-modal-top';

    const modal = {
        open() {
            if(destroed){
                return 'Модальное окно удалено из DOM-дерева';
            }
            !closingModal && $modal.classList.add(cssOpenClose);
        },
        close() {
            closingModal = true;
            $modal.classList.remove(cssOpenClose);
            $modal.classList.add(cssHide);
            setTimeout(()=>{
                $modal.classList.remove(cssHide);
                closingModal = false;
            },ANIMATION_SPEED);
        },
    }

    //события
    const listener = event => {
        if(event.target.dataset.modalClose){
            modal.close();
        }
    }

    $modal.addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            $modal.parentElement.removeChild($modal);
            $modal.removeEventListener('click', listener);
        },
        setContent(html) {
            $modal.querySelector('[data-modal-content]').innerHTML = html;
        }
    });
}