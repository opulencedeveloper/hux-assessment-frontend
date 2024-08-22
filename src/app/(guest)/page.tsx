import Details from "@/components/application/home/details";
import Features from "@/components/application/home/features";
import Footer from "@/components/application/home/footer";
import Header from "@/components/application/home/header";
import Hero from "@/components/application/home/hero";

export default function Page() {

    return (<>
        <div className="absolute inset-0 bg-top bg-no-repeat bg-illustration-01"></div>
        <div
            className="absolute inset-0 bg-center bg-no-repeat bg-illustration-02"
        ></div>
        <main className="container relative">
            <Header />
            <Hero />
            <Features />
            <Details />
            <Footer />
        </main>
    </>
    );
}

