var dataset = [
    {
        name: 'animation1',
        containerId: 'animation1container',
        childId: 'circle1',
        childOrigin: 'center',
        degree: 3,
        points: [{
            x: 0,
            y: 0
        }, {
            x: 1,
            y: 0
        }, {
            x: 1,
            y: 1
        }, {
            x: 0,
            y: 1
        }],
        loop: false,
        duration: 1000
    },{
        name: 'animation2',
        containerId: 'animation2container',
        childId: 'circle2',
        childOrigin: 'center',
        degree: 3,
        points: [{
            x: 0.5,
            y: 0
        }, {
            x: 0,
            y: 1
        }, {
            x: 1,
            y: 1
        }, {
            x: 0.5,
            y: 0
        }],
        loop: true,
        duration: 2000
    },{
        name: 'animation3',
        containerId: 'animation3container',
        childId: 'circle3',
        childOrigin: 'center',
        degree: 3,
        points: [{
            x: -1,
            y: 0.75
        }, {
            x: 4,
            y: 0.5
        }, {
            x: -3,
            y: 0.25
        }, {
            x: 2,
            y: 0.25
        }],
        loop: true,
        run: true,
        duration: 1000
    },{
        name: 'animation4',
        containerId: 'animation4container',
        childId: 'circle4',
        childOrigin: 'center',
        degree: 2,
        points: [{
            x: 0.5,
            y: 0.5
        }, {
            x: 0.5,
            y: 1.5
        }, {
            x: 0.5,
            y: 0
        }],
        loop: false,
        run: false,
        duration: 500,
        hideOnAnimationEnd: true
    },{
        name: 'animation5',
        containerId: 'animation5container',
        childId: 'circle5',
        childOrigin: 'bottom',
        degree: 1,
        points: [{
            x: 0.5,
            y: 1
        }, {
            x: 0.5,
            y: 0
        }],
        loop: true,
        easing: 'easeOutBounce',
        run: true,
        duration: 1000,
        hideOnAnimationEnd: false
    },{
        name: 'animation6',
        containerId: 'animation6container',
        childId: 'circle6',
        childOrigin: 'right',
        degree: 1,
        points: [{
            x: 0,
            y: 0.5
        }, {
            x: 1,
            y: 0.5
        }],
        loop: true,
        easing: 'easeInOutCubic',
        run: true,
        duration: 1000,
        hideOnAnimationEnd: true
    }
]