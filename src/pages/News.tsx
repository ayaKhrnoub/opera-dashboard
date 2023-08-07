import Title from "../components/Title";
import { BsInfoCircle } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import ReactPaginate from "react-paginate";
import InformationField from "../components/InformationField";
import { Modal } from "../components";
import { AiOutlineDelete } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { useDeleteRequest, useFetch, useToast } from "../hooks";
import { Link, useSearchParams } from "react-router-dom";
import { PaginationType, NewsType } from "../../types";
import ConfirmModal from "../components/ConfirmModal";

const News = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectNews, setSelectNews] = useState<NewsType>({
    id: 0,
    title: "",
    text: "",
    type: "",
    image: "",
    gallery: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading: requestIsLoading,
    getRequest,
    response,
  } = useDeleteRequest();

  const [NewsList, setNewsList] = useState<NewsType[]>([]);
  const [page, setPage] = useState<number>(() => {
    const pageString = searchParams.get("page");
    return pageString ? +pageString : 1;
  });
  const [maxPage, setMaxPage] = useState(5);
  const toast = useToast();
  const { data, isLoading, error } = useFetch(
    `/api/admin/news?count=5&page=${page}`
  );
  useEffect(() => {
    const res = response as {
      status: string;
      message: string;
    };
    if (res) {
      toast(res.message, "success", "bottom-left", "dark");
      setNewsList((prev) =>
        prev.filter((reservation) => reservation.id !== selectNews?.id)
      );
    }
  }, [response]);
  useEffect(() => {
    if (!isLoading && !error) {
      const NewsList = data as PaginationType<NewsType>;
      setNewsList(NewsList.data.data);
    }
  }, [isLoading, error, data]);
  useEffect(() => {
    if (!isLoading && maxPage === 5) {
      const NewsList = data as PaginationType<NewsType>;
      setMaxPage(NewsList.data?.last_page);
    }
  }, [isLoading]);

  useEffect(() => {
    if (page !== 1) setSearchParams({ page: `${page}` });
  }, [page]);

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => {
      setPage(selected + 1);
    },
    [setPage]
  );
  return (
    <>
      <Title>
        <h1 className="text-start text-3xl font-bold pl-4 text-white">news</h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Upcoming parties
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link
                    to="add"
                    className="bg-primary text-white active:scale-95 hover:bg-primary/80 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    add news
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <></>
                  ) : (
                    NewsList.map((news) => (
                      <tr key={news.id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {news.title}
                        </th>

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          <div className="flex justify-start text-2xl items-center gap-2">
                            <Tippy delay={300} content="more information">
                              <button
                                onClick={() => {
                                  setShowInfoModal(true);
                                  setSelectNews(news);
                                }}
                                className="cursor-pointer transform hover:text-primary hover:scale-110"
                              >
                                <span>
                                  <BsInfoCircle />
                                </span>
                              </button>
                            </Tippy>
                            <Tippy delay={300} content="delete">
                              <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setSelectNews(news);
                                }}
                                className="cursor-pointer transform hover:text-primary hover:scale-110"
                              >
                                <span>
                                  <AiOutlineDelete />
                                </span>
                              </button>
                            </Tippy>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            breakLabel="..."
            pageCount={maxPage}
            initialPage={page === 1 ? 0 : page - 1}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            onPageChange={handlePageChange}
            containerClassName="flex select-none justify-start gap-1 text-xs font-medium"
            pageClassName="flex h-8 w-8 active:scale-95 duration-200 items-center justify-center rounded border border-black"
            pageLinkClassName="flex active:scale-95 duration-200 items-center justify-center w-full h-full"
            previousClassName="flex h-8 active:scale-95 duration-200 w-8 items-center justify-center rounded border border-black"
            previousLinkClassName="flex items-center justify-center w-full h-full"
            nextLinkClassName="flex items-center justify-center w-full h-full"
            breakLinkClassName="flex items-center justify-center w-full h-full"
            nextClassName="flex h-8 active:scale-95 duration-200 w-8 items-center justify-center rounded border border-black"
            breakClassName="flex h-8 w-8 active:scale-95 duration-200 items-center justify-center rounded border border-black"
            activeClassName="bg-primary text-white bg-pink"
          />
        </div>
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          text={`Do you really want to delete (${selectNews?.title})`}
          actionName="delete"
          isLoading={requestIsLoading}
          action={async () => getRequest(`/api/admin/news/${selectNews?.id}`)}
        />
        <Modal
          clickOutSide
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        >
          <h2 className="text-center text-purple capitalize my-4 font-bold text-2xl">
            party information
          </h2>
          <div className="w-full sm:w-10/12 mx-auto">
            <div className="w-full flex justify-start items-center mb-4">
              <img
                className="rounded-lg"
                src={selectNews?.image}
                alt="news photo"
              />
            </div>
            <InformationField title="title" text={selectNews?.title} />
            <InformationField
              title="text"
              text={selectNews?.text}
              isTextHtml={true}
            />
          </div>
        </Modal>
      </section>
    </>
  );
};

export default News;
