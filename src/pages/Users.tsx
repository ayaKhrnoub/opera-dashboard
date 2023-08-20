import Title from "../components/Title";
import { BsInfoCircle, BsTicketPerforated } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import ReactPaginate from "react-paginate";
import InformationField from "../components/InformationField";
import { Button, Input, Loading, Modal } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useFetch, useToast } from "../hooks";
import { useSearchParams } from "react-router-dom";
import { PaginationType, UserType } from "../../types";
import usePostRequest from "../hooks/usePostRequest";
const Users = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectParty, setSelectParty] = useState<UserType>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    email_verified_at: "",
    allowed_tickets: 0,
    created_at: "",
    updated_at: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScanModal, setShowScanModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(
    `${selectParty.allowed_tickets}`
  );
  const [errorMsg, setErrorMsg] = useState("");
  const { postRequest, isLoading: loading } = usePostRequest();
  const toast = useToast();
  const [partiesList, setPartiesList] = useState<UserType[]>([]);
  const [page, setPage] = useState<number>(() => {
    const pageString = searchParams.get("page");
    return pageString ? +pageString : 1;
  });
  const [maxPage, setMaxPage] = useState(5);
  const { data, isLoading, error } = useFetch(
    `/api/admin/user/all?count=5&page=${page}`
  );
  useEffect(() => {
    if (!isLoading && !error) {
      const partiesList = data as PaginationType<UserType>;
      setPartiesList(partiesList.data.data);
    }
  }, [isLoading, error, data]);
  useEffect(() => {
    if (!isLoading && maxPage === 5) {
      const partiesList = data as PaginationType<UserType>;
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

  const editTicketNumber = () => {
    if (isNaN(+ticketNumber)) {
      setErrorMsg("number only");
      return;
    }
    postRequest("/api/admin/user/update-allowed-tickets", {
      user_id: selectParty.id,
      allowed_tickets: ticketNumber,
    });
    toast("done", "success", "bottom-left", "dark");
    setShowScanModal(false);
    setPartiesList((prev) =>
      prev.map((user) => {
        if (user.id === selectParty.id)
          return { ...user, allowed_tickets: +ticketNumber };
        else return user;
      })
    );
  };
  return (
    <>
      <Title>
        <h1 className="text-start text-3xl font-bold pl-4 text-white">Users</h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All users
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      first name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      last name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      verified
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
                          {party.first_name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4 ">
                          {party.last_name}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          {party.email}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                          {party.email_verified_at ? (
                            <span className="inline-block w-4 h-4 rounded-full bg-green-500" />
                          ) : (
                            <span className="inline-block w-4 h-4 rounded-full bg-red-500" />
                          )}
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
                            <Tippy delay={300} content="Edit Allowed Tickets">
                              <button
                                onClick={() => {
                                  setShowScanModal(true);
                                  setSelectParty(party);
                                  setTicketNumber(`${party.allowed_tickets}`);
                                }}
                                className="cursor-pointer transform hover:text-primary hover:scale-110"
                              >
                                <span>
                                  <BsTicketPerforated />
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
            <InformationField
              title="first name"
              text={selectParty?.first_name}
            />
            <InformationField title="last name" text={selectParty?.last_name} />
            <InformationField title="email" text={selectParty?.email} />
            <InformationField
              title="phone number"
              text={`${selectParty?.phone_number}`}
            />
            <InformationField
              title="allowed tickets"
              text={`${selectParty?.allowed_tickets}`}
            />
            <InformationField
              title="created at"
              text={selectParty?.created_at.slice(0, 10)}
            />
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
            <Input
              label="allowed tickets"
              error={errorMsg}
              setValue={setTicketNumber}
              value={ticketNumber}
            />
            <div className="flex justify-center items-center">
              <Button type="button" onClick={editTicketNumber}>
                {loading ? <Loading /> : "edit"}
              </Button>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Users;
