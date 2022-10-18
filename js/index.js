window.addEventListener("load", () => {
    /** Elements **/
    const navBtnContainer = document.querySelector(".showBtnCon");
    const navBtn = document.querySelector("button.showHideBtn");
    const navContd = document.querySelector(".left_sec_contd");
    /** GLOBAL STATES AND VARS **/
    let navOpenBool = false;
    const timeline = [];
    setTimeline();
    /** EVENT LISTENERS */
    navBtn.addEventListener("click",() => {
        !navOpenBool ? timeline[0].play(): timeline[0].reverse();
        navOpenBool = !navOpenBool;
    })


    function setTimeline(){
        let t1 = gsap.timeline();
        const commonOptions = {
            ease: "power2.inOut",
            duration: 0.8
        }

        t1.pause();
        timeline.push(t1)
        t1.to(navContd, {
            left: "0",
            ...commonOptions
        })
        .to(".left_sec_cover", {
            left: 0,
            duration: 0.4,
            ease: "power3.inOut",
            delay: 0.3
        }, "<")
        .to(navBtnContainer, {
            rotate: 180,
            ...commonOptions,
            right: () => {
                let value = null;
                //window.innerWidth <= 319 ? value ="50px" : value = "20px";
                window.innerWidth <=319 ? value = "-0px":
                (window.innerWidth >=320 && window.innerWidth <=480) ? value = "-25": value = "-40px";
                return value;
            }
        },"<")
    }
})