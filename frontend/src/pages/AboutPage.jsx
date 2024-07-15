import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCheck, FaCompass, FaMap, FaCogs, FaInfoCircle, FaRoute, FaCaravan, FaPaperPlane, FaReply, FaBalanceScale, FaStopwatch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#fef6e4] px-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 ">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Discover Your Next Adventure
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our travel planning website helps you find the perfect destination, get personalized
                    recommendations, and analyze sentiment from reviews to make the most of your next trip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-24">
          <div className="container px-4 md:px-6">
            <div className="gap-6">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Discover New Places</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Explore the World's Best Destinations
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                    Browse the latest reviews of popular destinations and discover new places to explore on your next trip.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Explore Top Destinations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheck className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Read Traveler Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCompass className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Discover Hidden Gems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMap className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Plan Your Next Adventure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#fef6e4] px-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 ">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">AI-Powered Suggestions</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Personalized Travel Recommendations
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                    Our AI algorithm analyzes your preferences and past trips to provide personalized recommendations for your next adventure.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaCogs className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Tailored Recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Destination Insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRoute className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Curated Itineraries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCaravan className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Personalized Experiences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Sentiment Analysis</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Understand Traveler Sentiment</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                    Our sentiment analysis tools provide insights into how travelers feel about a destination, helping you make informed decisions for your next trip.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaPaperPlane className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Positive Sentiment Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaReply className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Traveler Feedback Insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBalanceScale className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Destination Ratings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStopwatch className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Trending Destinations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
