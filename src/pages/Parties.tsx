import Title from "../components/Title";
import { BsInfoCircle } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import ReactPaginate from "react-paginate";
import { BiArchive } from "react-icons/bi";
import InformationField from "../components/InformationField";
import { Button, Loading, Modal, Scanner, UploadFile } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks";
import { Link, useSearchParams } from "react-router-dom";
import { PaginationType, PartyType } from "../../types";
import usePostRequest from "../hooks/usePostRequest";

const Parties = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { postRequest, isLoading: loading } = usePostRequest();
  const [selectParty, setSelectParty] = useState<PartyType>({
    id: 0,
    theater_id: 0,
    name: "",
    orchestra_name: "",
    theater_name: "",
    seats_number: 0,
    booked_seats_number: 0,
    seats: "",
    ticket_price: "",
    closed: 0,
    date: "",
    created_at: "",
    photo: "",
    program: "",
    orchestra: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScanModal, setShowScanModal] = useState(false);
  const [partiesList, setPartiesList] = useState<PartyType[]>([]);
  const [page, setPage] = useState<number>(() => {
    const pageString = searchParams.get("page");
    return pageString ? +pageString : 1;
  });
  const [maxPage, setMaxPage] = useState(5);
  const [image, setImage] = useState<File | undefined>(undefined);
  const { data, isLoading, error } = useFetch(
    `/api/admin/party/all?count=5&page=${page}`
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isLoading && !error) {
      const partiesList = data as PaginationType<PartyType>;
      setPartiesList(partiesList.data.data);
    }
  }, [isLoading, error, data]);
  useEffect(() => {
    if (!isLoading && maxPage === 5) {
      const partiesList = data as PaginationType<PartyType>;
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

  const addImageToArchive = () => {
    if (image === undefined) {
      setErrorMsg("required");
      return;
    }
    postRequest(`/api/admin/party/add-to-archive/${selectParty.id}`, {
      photos: [image],
    });
    setShowScanModal(false);
  };
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
                    Upcoming parties
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link
                    to="add"
                    className="bg-primary text-white active:scale-95 hover:bg-primary/80 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    add new party
                  </Link>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple text-white active:scale-95 hover:bg-purple/80 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    scan QR code
                  </button>
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
                      orchestra name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      booked
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      more information
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <></>
                  ) : (
                    partiesList.map((party) => (
                      <tr key={party.id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {party.name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4 ">
                          {party.orchestra_name}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          {party.booked_seats_number}/{party.seats_number}
                        </td>
                        <td className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          <div className="flex justify-start text-2xl items-center gap-2">
                            <Tippy delay={300} content="more information">
                              <button
                                onClick={() => {
                                  setShowInfoModal(true);
                                  setSelectParty(party);
                                }}
                                className="cursor-pointer transform hover:text-primary hover:scale-110"
                              >
                                <span>
                                  <BsInfoCircle />
                                </span>
                              </button>
                            </Tippy>
                            <Tippy delay={300} content="add to Archive">
                              <button
                                onClick={() => {
                                  setShowScanModal(true);
                                  setSelectParty(party);
                                }}
                                className="cursor-pointer transform hover:text-primary hover:scale-110"
                              >
                                <span>
                                  <BiArchive />
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
        <Modal
          clickOutSide
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        >
          <h2 className="text-center text-purple capitalize my-4 font-bold text-2xl">
            party information
          </h2>
          <div className="w-full sm:w-10/12 mx-auto">
            <div className="w-full aspect-w-16 aspect-h-9 flex justify-start items-center mb-4">
              <img
                className="rounded-lg object-cover"
                src={selectParty?.photo}
                alt="party photo"
              />
            </div>
            <InformationField title="name" text={selectParty?.name} />
            <InformationField
              title="orchestra name"
              text={selectParty?.orchestra_name}
            />
            <InformationField
              title="theater name"
              text={selectParty?.theater_name}
            />
            <InformationField
              title="seats number"
              text={`${selectParty?.seats_number}`}
            />
            <InformationField
              title="booked seats number"
              text={`${selectParty?.booked_seats_number}`}
            />
            <InformationField
              title="ticket price"
              text={selectParty?.ticket_price}
            />
            <InformationField title="date" text={selectParty?.date} />
          </div>
        </Modal>
        <Modal
          clickOutSide
          isOpen={showScanModal}
          onClose={() => setShowScanModal(false)}
        >
          <div className="px-4">
            <h2 className="text-center text-primary text-2xl font-bold py-5">
              allowed tickets
            </h2>
            <UploadFile error={errorMsg} setFile={setImage} />
            <div className="flex justify-center items-center">
              <Button type="button" onClick={addImageToArchive}>
                {loading ? <Loading /> : "add"}
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          clickOutSide
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <Scanner />
        </Modal>
      </section>
    </>
  );
};

export default Parties;
