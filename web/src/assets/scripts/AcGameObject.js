const AC_GAME_OBJECT = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECT.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() {  //只执行一次
    }

    update() {  //除第一帧外每一帧执行一次

    }

    on_destory() {  //删除之前执行

    }

    destory() {
        this.on_destory();

        for (let i in AC_GAME_OBJECT) {
            const obj = AC_GAME_OBJECT[i];
            if (obj === this) {
                AC_GAME_OBJECT.splice(i);
                break;
            }
        }
    }
}

let last_timestamp; //上一次执行的时刻
const step = timestamp => {
    for (let obj of AC_GAME_OBJECT) {
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)