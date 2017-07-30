/**
* create toaster
* @author  YernSun<yernsun@gmail.com>
* @file    toast.js
* @version 1.0
*/

let hasRegister = false;

module.exports = function (msg, timer = 1.5) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    let show = true;
    toast.innerHTML = msg;
    setTimeout(() => {
        show = false;
        toast.remove();

    }, timer * 1000);

    document.body.appendChild(toast);
    if (hasRegister) {
        return;
    }

    hasRegister = true;
    document.addEventListener('click', () => {
        if (show) {
            toast.remove();
        }
    }, true);
}