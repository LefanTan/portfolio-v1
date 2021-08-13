import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { isMobile } from "react-device-detect";
import { useScrollListener } from "./Hooks";
import { BasicProp } from "./Interfaces";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Projects } from "./Projects";
import { directToPage } from "./helpers";
import { HomeButton } from "../App";

export const projectPageTypes = ['experience', 'work', 'work ii', 'work iii']
export const ProjectPage = memo(({ className }: BasicProp) => {

    const [mainDom, setMainNode] = useState<HTMLInputElement | null>(null)
    const [currentPage, setCurrentPg] = useState(projectPageTypes[1])
    const [transition, setTransState] = useState(true)

    const refHandler = useCallback((node: HTMLInputElement) => {
        if (node !== null) {
            setMainNode(node)
        }
    }, [])

    const navigate = (n: number) => {
        let nextIndex = (projectPageTypes.indexOf(currentPage) + n) % projectPageTypes.length
        if (nextIndex === -1) nextIndex = projectPageTypes.length - 1

        setCurrentPg(projectPageTypes[nextIndex])
    }

    useScrollListener(mainDom, (isIn) => setTransState(isIn))

    const menu = (
        <div className="flex justify-center items-center ml-1 mr-1">
            {!isMobile &&
                <motion.div animate={{ opacity: transition ? 1 : 0 }}
                    className="bg-off-white rounded-xl shadow-lg h-fit w-fit z-20 flex flex-col justify-center items-center z-40 px-1.5 py-1">
                    <motion.p animate={{ opacity: transition ? 1 : 0 }} transition={{ type: "spring", duration: 1 }}
                        className="font-main font-semibold text-dark-grey text-2xl">My Projects</motion.p>
                    <motion.div
                        animate={{ opacity: transition ? 1 : 0 }}
                        transition={{ delay: 1 }}
                        className="w-full flex justify-center mt-2">
                        {projectPageTypes.map((type: string) =>
                            <button onClick={() => { setCurrentPg(type); }} className={`font-main 
        ${currentPage === type ? `text-off-white bg-dark-grey` : 'text-dark-grey bg-transparent'} duration-100 rounded-md px-1 m-0.25 transform hover:scale-110`}>
                                {type}</button>
                        )}
                    </motion.div>
                    <motion.div
                        animate={{ opacity: transition ? 1 : 0 }}
                        transition={{ delay: 1 }}
                        className="w-full h-fit flex justify-center items-center relative">
                        <button onClick={() => navigate(-1)} className="text-dark-grey h-8 transition duration-100 hover:text-dark-grey-hover transform active:scale-90"><BsArrowLeftShort className="w-full h-full" /></button>
                        <button onClick={() => navigate(1)} className="text-dark-grey h-8 transition duration-100 hover:text-dark-grey-hover transform active:scale-90"><BsArrowRightShort className="w-full h-full" /></button>
                    </motion.div>
                </motion.div>}
        </div>)

    return (
        <div id='myprojects' ref={refHandler} className={`${className}`}>
            <motion.div 
            className="bg-off-white w-full h-fit px-3 py-2 flex items-center z-50">
                <h1 className="font-main font-semibold text-dark-grey text-xl mr-2">My Projects</h1>
                {projectPageTypes.map((type: string, index: number) =>
                    <button key={index} onClick={() => { setCurrentPg(type); }} className={`font-main text-sm
                    ${currentPage === type ? `text-off-white bg-dark-grey` : 'text-dark-grey bg-transparent'} duration-100 rounded-md px-1 m-0.5 transform hover:scale-110`}>
                        {type}</button>
                )}
            </motion.div>
            <div className="bg-deep-blue w-screen h-pgpage lg:h-screen flex justify-center items-center overflow-x-hidden overflow-y-auto lg:overflow-y-hidden relative z-0">
                {!isMobile && <motion.div
                    animate={{ x: transition ? '100%' : '10%' }} transition={{ type: "spring", duration: 2, delay: 1 }}
                    style={{ background: `linear-gradient(-160deg, ${getComputedStyle(document.body).getPropertyValue('--deep-blue-shade')} 50%, transparent 50%)` }}
                    className="absolute top-0 bottom-0 -left-1/2 -right-full lg:-right-1/2 drop-shadow-lg z-0" />
                }
                <HomeButton trigger={transition} position="lg:bottom-18 right-5"/>
                <div className="w-full h-full relative flex justify-center items-center z-10 overflow-x-hidden">
                    {/* EXPERIENCE PAGE 1 */}
                    {currentPage === projectPageTypes[0] && <div className="flex items-center justify-center">
                        <h1 className="font-main text-3xl text-off-white">TBD</h1>
                    </div>}
                    {/* WORK PAGE 1 */}
                    {currentPage === projectPageTypes[1] && <div className="projects-container">
                        <Projects slideFrom="left" transition={transition} imgFileName='big2.mp4' title="Big 2" year="2021" languages={['react', 'js', 'firebase']}
                            github="https://github.com/LefanTan/big2" website="https://lefantan.github.io/big2/"
                            description="An online website based on the card game - Big 2. It has a lobby system, allowing you to play Big 2 with your friends from anywhere in the world." />
                        {/* {menu} */}
                        <Projects slideFrom="right" transition={transition} imgFileName='basictheory.mp4' title="Basictheory.io" year="2020" languages={['react', 'js', 'firebase']}
                            github="https://github.com/LefanTan/basictheory" website="https://lefantan.github.io/basictheory/"
                            description="An interactive online wiki that shows you different ways of playing chords of all types / voicing. 
                        It also contains information on how to play almost every scales of different shapes (CAGED system)." />
                    </div>}
                    {/* WORK PAGE 2 */}
                    {currentPage === projectPageTypes[2] && <div className="projects-container">
                        <Projects slideFrom="left" transition={transition} imgFileName='wobblyisland.mp4' title="Wobbly Island" year="2020" languages={['unity3d', 'c#']}
                            github="https://github.com/LefanTan/FloatingIsland" website="https://github.com/LefanTan/FloatingIsland/releases/tag/1.0"
                            description="This is a hackathon unity project made by my friends and I.
                        We implemented basic procedural land generation using perlin noise and masked it with a circle gradient to get individual islands" />
                        {/* {menu} */}
                        <Projects slideFrom="right" transition={transition} imgFileName='feelslog.mp4' title="FeelsLog" year="2020" languages={['c#', 'firestore', 'android api']}
                            github="https://github.com/LefanTan/FeelsLog" taller
                            description="An android app made to track your daily emotions in a diary format. You can upload a journal that 
                        includes your location, mood, description, photo etc, so you can better understand your own emotions" />
                    </div>}
                    {currentPage === projectPageTypes[3] && <div className="projects-container">
                        <Projects slideFrom="left" transition={transition} imgFileName='it-tracker.mp4' title="Internet Tracker" year="2019" languages={['js', 'html', 'css', 'chrome api']}
                            github="https://github.com/LefanTan/Internet-Tracker" taller
                            description="A hackathon project that got first trying out html, css and javascript. It is a chrome extension that tracks internet usage (time, websites visited)" />
                        {/* {menu} */}
                        <Projects slideFrom="right" transition={transition} imgFileName='zombiegame.mp4' title="Zombiegame" year="2017" languages={['c++']}
                            github="https://github.com/LefanTan/Zombie-Game"
                            description="A ascii graphic zombie game written in c++, featuring collision detection mode, ability to attack, and A* pathfinding algorithm for zombies to path towards the player" />
                    </div>}
                </div>
            </div>
        </div>
    )
})