import { TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { View } from "tns-core-modules/ui/core/view";
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { Label } from 'tns-core-modules/ui/label';

export function onTap() {
    console.log('tap event');
}


export function onTouch(args: TouchGestureEventData) {
    if (args.action !== 'down') {
        return;
    }

    const x = args.getX();
    const y = args.getY();

    const btn = args.object as View;
    const wrapper = btn.parent as LayoutBase;

    const circle = new Label();

    const btnHeight = Number(btn.height);
    const btnWidth = Number(btn.width);

    const d = Math.max(btnHeight, btnWidth);

    circle.width = d;
    circle.height = d;
    circle.borderRadius = d / 2;
    circle.top = y - d / 2;
    circle.left = x - d / 2;
    circle.backgroundColor = 'white';
    circle.opacity = 0;

    wrapper.addChild(circle);

    circle.animate({
        scale: { x: 0, y: 0 },
        opacity: 0.4,
        duration: 1
    }).then(() => {
        circle.animate({
            scale: { x: 2, y: 2 },
            opacity: 0,
            duration: 500
        }).then(() => {
            wrapper.removeChild(circle);
        });
    });
}
