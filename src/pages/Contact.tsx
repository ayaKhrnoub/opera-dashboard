import Title from "../components/Title";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import ReactPaginate from "react-paginate";
import InformationField from "../components/InformationField";
import { Modal, Scanner } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useDeleteRequest, useFetch, useToast } from "../hooks";
import { useSearchParams } from "react-router-dom";
import { PaginationType, ContactType } from "../../types";
import ConfirmModal from "../components/ConfirmModal";

const Contact = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectContactUs, setSelectContactUs] = useState<ContactType>({
    id: 0,
    name: "",
    email: "",
    number: 0,
    message: "",
    created_at: "",
    updated_at: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScanModal, setShowScanModal] = useState(false);
  const [contactUsList, setContactUsList] = useState<ContactType[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(() => {
    const pageString = searchParams.get("page");
    return pageString ? +pageString : 1;
  });
  const {
    isLoading: requestIsLoading,
    getRequest,
    response,
  } = useDeleteRequest();

  const [maxPage, setMaxPage] = useState(5);
  const { data, isLoading, error } = useFetch(
    `/api/admin/contact?count=5&page=${page}`
  );
  const toast = useToast();

  useEffect(() => {
    if (!isLoading && !error) {
      const partiesList = data as PaginationType<ContactType>;
      setContactUsList(partiesList.data.data);
    }
  }, [isLoading, error, data]);

  useEffect(() => {
    const res = response as {
      status: string;
      message: string;
    };
    if (res) {
      toast(res.message, "success", "bottom-left", "dark");
      setContactUsList((prev) =>
        prev.filter((reservation) => reservation.id !== selectContactUs?.id)
      );
    }
  }, [response]);
  useEffect(() => {
    if (!isLoading && maxPage === 5) {
      const partiesList = data as PaginationType<ContactType>;
      setMaxPage(partiesList.data?.last_page);
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
        <h1 className="text-start text-3xl font-bold pl-4 text-white">
          Parties
        </h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Communication requests
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      number
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <></>
                  ) : (
                    contactUsList.map((message) => (
                      <tr key={message.id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {message.name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4 ">
                          {message.email}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          {message.number}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          <div className="flex justify-start text-2xl items-center gap-2">
                            <Tippy delay={300} content="more information">
                              <button
                                onClick={() => {
                                  setShowInfoModal(true);
                                  setSelectContactUs(message);
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
                                  setDeleteModal(true);
                                  setSelectContactUs(message);
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
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          text={`Do you really want to delete this message `}
          actionName="delete"
          isLoading={requestIsLoading}
          action={async () =>
            getRequest(`/api/admin/contact/${selectContactUs?.id}`)
          }
        />
        <Modal
          clickOutSide
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        >
          <h2 className="text-center text-purple capitalize my-4 font-bold text-2xl">
            contact information
          </h2>
          <div className="w-full sm:w-10/12 mx-auto">
            <InformationField title="name" text={selectContactUs?.name} />
            <InformationField title="email" text={selectContactUs?.email} />
            <InformationField
              title="number"
              text={`${selectContactUs?.number}`}
            />
            <InformationField title="message" text={selectContactUs?.message} />
            <InformationField
              title="date"
              text={selectContactUs?.created_at.slice(0, 10)}
            />
          </div>
        </Modal>
        <Modal
          clickOutSide
          isOpen={showScanModal}
          onClose={() => setShowScanModal(false)}
        >
          <Scanner />
        </Modal>
      </section>
    </>
  );
};

export default Contact;
