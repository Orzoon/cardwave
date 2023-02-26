

window.addEventListener("load", () => {
    /** Elements **/
    const navBtnContainer = document.querySelector(".showBtnCon");
    const navBtn = document.querySelector("button.showHideBtn");
    const navContd = document.querySelector(".left_sec_contd");
    const left_sec_contd = document.querySelector(".left_sec_contd");
    const bookButtonListArr = document.querySelectorAll("li.bottom");
    //---> BookHheading and Description --parent
    const headingWrapper = document.querySelector(".headingWrapper");
    const paraWrapper = document.querySelector(".paraWrapper");
    const colors = [
        ["#f3c9d4","#a573bc"],
        ["#f3c296","#ba471a"],
        ["#8cddf2","#255e6c"]
    ]

    /** initialLoadAnimations */
    initialLoadAnimation();
    /** GLOBAL STATES AND VARS **/
    let navOpenBool = false;
    let zIndex = 1;
    const timeline = [];
    setNavTimeline();
    /** EVENT LISTENERS */
    navBtn.addEventListener("click",() => {
        !navOpenBool ? timeline[0].play(): timeline[0].reverse();
        navOpenBool = !navOpenBool;
    })

    // window screenSize listener
    window.addEventListener("resize", () => {
            navOpenBool = false;
            if(timeline.length > 0){
                timeline[0].reverse().progress(0);
                timeline[0].kill();
                timeline[0] = null;
                timeline.length = 0;
            }
            // back to the position
            let leftVal = 0;
            let innerWidth = window.innerWidth;

            innerWidth <320 ? leftVal = -240 : 
            (innerWidth >=320 && innerWidth <480) ? leftVal = -265:
            (innerWidth >=480 && innerWidth <768) ? leftVal = 'calc(-90% + 30px)':
            (innerWidth >=768 && innerWidth <1024) ? leftVal = 'calc(-600px + 30px)':
            (innerWidth >=1024) ? leftVal = 0:

            leftVal = 0
            

            gsap.to(".left_sec_contd", {
                left: leftVal,
                duration: 0,
                delay: 0
            })

            gsap.to(".left_sec_cover", {
                left: "-105%",
                duration: 0,
                delay: 0
            })

            setNavTimeline();
    })

    // btn listener
    bookButtonListArr.forEach((list, index) => {
        list.addEventListener("click", chageBook.bind(this, index))
    })

    function setNavTimeline(){
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
    
    function initialLoadAnimation(){
        // figure0 in position
        gsap.to(".figure0", {
            top: "0%",
            duration: 0
        })

        gsap.to(".roundCon",{
            duration: 0,
            background: `linear-gradient(to bottom right, ${colors[0][0]}, ${colors[0][1]})`
        })
        
        let leftTimeline = gsap.timeline({})
        let rightTimeline = gsap.timeline({
           
        })

        let commonOptions1 = {
            delay: 0.3
        }
        leftTimeline
        .from(".logo_section .logoContd", {
            opacity: 0,
            duration:0.3,
            ease: "ease-in-out"
        })
        .from([".logo_section h2"], {
            top: "15px",
            opacity:0,
            duration: 0.45,
        }, "<")
        .from(".logo_section p", {
            top: "8px",
            opacity:0,
            duration: 0.45,
        }, "<0.2")
        .from("ul.dashboard_contd", {
            top: "10px",
            opacity: 0,
            duration: 0.4
        }, "<0.2")
        .from(["li.heading .h_logo", "li.heading h4"], {
            opacity: 0,
            top: "8px",
            duration: 0.6,
            delay: 0.3
        }, "<")
        // common li h5
        .from(["li.li_common h5"], {
            opacity: 0,
            top: "8px",
            duration: 0.4,
            stagger: {
                each: 0.1,
            }
        }, "<0.3")
        .addLabel("progressbar")
        .from (["li.li_common h4"], {
            opacity: 0,
            top: "15px",
            duration: 0.4,
            stagger: {
                each: 0.1,
            }
        }, "<0.2")
        .from(".progressbarCon", {
            opacity: 0,
            duration: 0.4,
            stagger:{
                each: 0.2
            }
        }, "<progressbar")
        .addLabel("achievement_icon")
        .from([".pFirst", ".pSecond", ".pThird"], {
            left: "-100%",
            duration: 0.6,
            stagger:{
                each: 0.3
            }
        }, "<")
        .from(".achievement_icon", {
            opacity: 0,
            top: "15px",
            stagger: {
                each: 0.4
            }
        }, "<achievement_icon")
        

        rightTimeline
        // same as left
        .from(".small_logo .logoContd", {
            opacity: 0,
            duration:0.3,
            ease: "ease-in-out"
        })
        .from([".small_logo h2"], {
            top: "15px",
            opacity:0,
            duration: 0.45,
        }, "<")
        .from(".small_logo p", {
            top: "8px",
            opacity:0,
            duration: 0.45,
        }, "<0.2")
        // text section--inner-- o.2 before
        .to(".text_sec .headingWrapper h2", {
            top: "0%", // 40% from opacity 0
            opacity: 1,
            duration: 0.8 /// 0.5
        }, "<0.3")
        .to(".text_sec .paraWrapper p", {
            top: "0%", // 40% from opacity 0
            opacity: 1,
            duration: 0.8
        }, "<0.2")
        .from("button.reviewBtn", {
            top: "15px",
            opacity: 0,
            duration: 0.6
        }, "<0.3")
        .addLabel("topRight")
        //? card //
        //-----> 
        .from(".roundCon", {
            opacity: 0,
            duration: 0.6,
        }, "<0.2")

        // .from([".book__face"], {
        //     opacity: 0,
        //     duration: 0.4,
        //     stagger: {
        //         each: 0.1
        //     }
        // }, "<0.3")
        .from([".bookContainer"], {
            opacity: 0,
            duration: 1.5,
        }, "<0.3")

        //? ul swipe
        .from("ul.swipe_sec li", {
            opacity: 0,
            left: 10,
            duration: 0.6,
            stagger:{
                each: 0.2
            }
        }, "<topRight0.2")
        .from(".bExpandTitle", {
            opacity: 0,
            duration: 0.6
        }, "<0.3")
        .from(".left_sec_contd", {
            boxShadow: "none",
            duration: 0.6
        }, "<")
        .from(".showHideBtn", {
            opacity: 0,
            duration: 0.6,
            right: 10
        }, "<0.2")
    }

    // Book details
    const bookInfoArray = [
        {
            displayText: "Wonderful Geography",
            description: "The Earth's atmosphere and climate have changed since it formed more than four billion years ago"
        },
        {
            displayText: "Samurai Warrior",
            description: "The samurai trace their origins to the Heian Period campaigns to subdue the native Emishi people"
        },
        {
            displayText: "Cosmos",
            description: "In theology, the cosmos is the created heavenly bodies (sun, moon, wandering stars, and stars)"
        },
    ]
    
    let currentBookNo = 0;
    let prevBookNo = null;
    function chageBook(bookNumber){
        if(currentBookNo == bookNumber) {
            prevBookNo = null;
            return};
        prevBookNo = currentBookNo;
        currentBookNo = bookNumber;
     
        // click Button
        __tChangeBookBtnAnim(bookNumber)
        
        // change BookDisplayText and description
        __tChangeBookDisDes(prevBookNo, currentBookNo)

        // changing book cover
        __tChangeBookCover(prevBookNo, currentBookNo)

        // gsap.to(".svgContainer",{
        //     right: "-100%",
        //     duration: 3,
          
           
        // })

    }
    //** HELPER FUNCTIONS  **//
    function __tChangeBookDisDes(prevBookNo, currentBookNo){
        
        // creating current element H2 and P
        const newElemH2 = document.createElement('H2');
        const newElemP = document.createElement('P');
        // class--global
        newElemH2.setAttribute("class", "displayText");
        newElemP.setAttribute("class", "bookDes");
        // class based on index clicked
        newElemH2.classList.add(`displayText${currentBookNo}`)
        newElemP.classList.add(`bookDes${currentBookNo}`)

        // newElement InnerText---from book Info Array
        const H2Text = document.createTextNode(`${bookInfoArray[currentBookNo].displayText}`)
        const PText = document.createTextNode(`${bookInfoArray[currentBookNo].description}`)
        newElemH2.appendChild(H2Text);
        newElemP.appendChild(PText)
        //attaching to the main parentElement
        headingWrapper.appendChild(newElemH2);
        paraWrapper.appendChild(newElemP);
        

        // removing previousones-
        const prevElemH2 = document.querySelector(`.displayText${prevBookNo}`)
        const prevElemP = document.querySelector(`.bookDes${prevBookNo}`)


        // removing the previous one-- heading
        gsap.to(prevElemH2,{
            top: "-100%",
            duration: 0,
            opacity: 0,
            onComplete: () => {
                // removing from dom
                headingWrapper.removeChild(prevElemH2)
            }
        })

        gsap.to(newElemH2, {
            top: "0%", 
            opacity: 1,
            duration: 0.5,
        })

        // removing the previous one-- Description
        gsap.to(prevElemP, {
            top: "-150%",
            duration: 0,
            opacity: 0,
            onComplete: () => {
                paraWrapper.removeChild(prevElemP)
            }
        })


        gsap.to(newElemP, {
            delay: 0.1,
            top: "0%", 
            opacity: 1,
            duration: 0.5,
        })

        // getting height and setting it
    }

    function __tChangeBookCover(prevBookNo, currentBookNo){
        const bookCover = document.querySelector(`.figure${currentBookNo}`);
        const bookCoverSvg = document.querySelector(`.svgContainer${currentBookNo}`);
        bookCover.style.zIndex = zIndex + 1;
        zIndex++;


        gsap.fromTo(bookCoverSvg,{
            left: "0%"
        },{
            left: "-200%",
            duration: 2.5
        })
        
      
        const Book = document.querySelector(".Book");
        const bookHeight = parseInt(window.getComputedStyle(Book).height);
        gsap.fromTo(bookCover,{
            // bug with gsap cal2.5
                top: bookHeight + 100
            },
            {
                top: "0%",
                duration: 1,
                //ease: 'ease-in-out'
            }  
        )

        gsap.to(".roundCon",
            {
                delay: 0.4,
                background:`linear-gradient(to bottom right, ${colors[currentBookNo][0]}, ${colors[currentBookNo][1]})`,
                duration: 0.8,
                ease: "linear",
                onComplete: () => {
                    console.log("completetd")
                }
            }
        )

    }


    //** timeline Helper */
    const titleArray = document.querySelectorAll("li.bottom .title");
    const monthArray = document.querySelectorAll("li.bottom .month");
    const noArray = document.querySelectorAll("li.bottom .no");

    function __tChangeBookBtnAnim(bookNumber){
        const bottom = bookButtonListArr[bookNumber]
        const title = titleArray[bookNumber]
        const month = monthArray[bookNumber]
        const no = noArray[bookNumber];


        const options = {
            duration: 0.2,
            ease: "ease-in-out"
        }

        const bExpandTitle = document.querySelector(".bExpand");

        if(bExpandTitle){
            bExpandTitle.classList.remove("bExpand")
        }
        // bottom parent
        gsap.to(bottom,{
            position: "relative",
            width: "100px",
            height: "100px",
            padding: "10px 12px",
            background: "#fff",
            duration: options.duration,
            ease: options.ease
        })


        // title
        gsap.to(title,{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            opacity: 1,
            duration: options.duration,
        })

        gsap.to(month, {
            position: "absolute",
            duration: 0,
            left: "50%",
            transform: "translateX(-50%)"
        })
        // month
        gsap.to(month, {
            top: "-25px",
            duration: options.duration
        })

        gsap.to(no, {
            fontSize: "16px",
            color: "#05BAC7",
            textAlign: "center",
        })


        
        if( prevBookNo !== null){
            // prev elements
            const bottom = bookButtonListArr[prevBookNo]
            const title = titleArray[prevBookNo]
            const month = monthArray[prevBookNo]
            const no = noArray[prevBookNo];

            // no
            gsap.to(no, {
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "center",
                color: "#636364"
            })
            // month
            gsap.to(month, {
                top: "0px",
                duration: options.duration
            })
            gsap.to(month, {
                position: "relative",
                duration: 0,
                left: "0%",
                textAlign: "center",
                transform: "none"
            })


            // title
            gsap.to(title,{
                display: "none",
                opacity: 0,
                duration: 0,
                // delay: 0.1
            })

            // bottom parent
            gsap.to(bottom,{
                position: "relative !important",
                width: "50px",
                height: "54px",
                padding: "6px 12px",
                background: "#ECEDF4",
                duration: options.duration,
                ease: options.ease,

                display: "grid",
                gridTemplateColumns: "1f",
                gridAutoRows: "auto",
                gridRowGap:"6px",
               
            })
        }
    }

})