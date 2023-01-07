import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

// install swiper styles
SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);

function BlogCarousel({ posts }) {
  return (
    <section className="lg:w-[1700px] md:w-[700px] mx-auto">
      <Swiper
        scrollbar={{ draggable: false, hide: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        loop={true}
      >
        {posts?.map(
          (post) =>
            post?.globalTag !== "none" && (
              <SwiperSlide key={post?._id}>
                <div className="grid lg:grid-cols-2 lg:gap-x-12 md:grid-cols-2 md:gap-x-10 grid-cols-1 lg:h-[650px] md:h-[500px] h-[450px]">
                  <div
                    className="bg-no-repeat bg-center bg-cover lg:rounded-xl md:rounded-xl lg:h-auto md:h-auto h-[300px]"
                    style={{ backgroundImage: `url(${post?.thumbnail?.url})` }}
                  />
                  <article className="flex flex-col lg:gap-y-4 md:gap-y-4 gap-y-3 lg:h-auto md:h-auto h-full my-auto lg:px-0 px-4">
                    <div
                      style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                      className="text-xs px-3 rounded-full bg-purple-200 text-purple-800 w-fit"
                    >
                      {post?.globalTag}
                    </div>
                    <h1 className="lg:text-6xl md:text-3xl font-bold text-black lg:leading-[4rem] md:leading-[4rem] text-ellipsis overflow-hidden whitespace-nowrap">
                      {post?.title}
                    </h1>
                    <p className="text-slate-600">
                      By{" "}
                      <span className="font-medium text-slate-700">
                        {post?.creator?.name}
                      </span>{" "}
                      @ {post?.createdAt?.split("T")[0]}
                    </p>
                  </article>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </section>
  );
}

export default BlogCarousel;
