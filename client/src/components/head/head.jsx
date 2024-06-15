import React,{useRef} from "react";
import bg2 from '../../assets/bg2.jpg'
import img1 from '../../assets/3.png'

const Head=({scrollIntoView})=>{
    
    const property = useRef(1);
    

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };
        
    return(
        <div >
            <div >
                
                <img src={bg2} alt="img " className="h-[60vh]   object-cover lg:object-center object-bottom w-screen "/>
                
            </div>
            <div className="items-center   justify-center">
            <section class="absolute   -mt-[70vh] bg-white mx-32  px-3 h-[500px] lg:h-[400px] bg-[hsla(0,0%,5%,0.7)] shadow-black/50  rounded-lg backdrop-blur-[15px] dark:bg-black/70">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto    mt-20  lg:mt-0 shrink-0 grow-0 place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl -mt-16 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Seamless Rental Solutions, Your Way</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-base lg:text-lg dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
                        <p  class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </p>
                        <a href="/seller-dashboard"  class="inline-flex   bg-gray-100 lg:bg-transparent items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-black lg:dark:text-white  dark:border-gray-300 dark:hover:bg-gray-200 dark:hover:text-black dark:focus:ring-gray-800">
                            Speak to Sales
                        </a> 
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
                    </div>                
                </div>
            </section>
            <div className=" z-50 mt-80  lg:mt-60 gap-16 flex items-center justify-center">
                    <a href="#property"   className=" cursor-pointer items-center  justify-center px-8 py-3 text-lg font-medium text-center text-white border border-gray-300 bg-gray-950/85  rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100   dark:border-gray-300 dark:hover:bg-gray-200 dark:hover:text-black dark:focus:ring-gray-800">Buy Now</a>

                    <a href="/seller-dashboard" className=" cursor-pointer items-center  justify-center px-8 py-3 text-lg font-medium text-center text-gray-9 border-2 border-gray-950 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100   dark:border-gray-300 dark:hover:bg-gray-200 dark:hover:text-black dark:focus:ring-gray-800">Sell Now</a>
            </div>
                
            </div>

        </div>
    )
}
export default Head;