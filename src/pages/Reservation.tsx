import { useState, useEffect } from "react";
import Title from "../components/Title";
import { AiOutlineDelete, AiOutlineFileDone } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { ReservationApiType, ReservationType } from "../../types";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useFetch, useToast } from "../hooks";
import ConfirmModal from "../components/ConfirmModal";
import useGetRequest from "../hooks/useGetRequest";
import { Modal } from "../components";
import ReservationField from "../components/InformationField";
import { Link } from "react-router-dom";

const Reservation = () => {
  const { data, isLoading, error } = useFetch("/api/admin/booking/all");

  const toast = useToast();
  const [selectReservation, setSelectReservation] = useState<ReservationType>({
    created_at: "",
    date: "",
    email: "",
    id: 0,
    name: "",
    number_of_people: 0,
    party_reason: "",
    phone: "",
    status: "pending",
    updated_at: "",
    user_id: 0,
  });
  const [acceptModal, setAcceptModal] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [pendingReservation, setPendingReservation] = useState<
    ReservationType[]
  >([]);

  const { isLoading: requestIsLoading, getRequest, response } = useGetRequest();

  useEffect(() => {
    const res = response as {
      status: string;
      message: string;
    };
    if (res) {
      toast(res.message, "success", "bottom-left", "dark");
      setPendingReservation((prev) =>
        prev.filter((reservation) => reservation.id !== selectReservation?.id)
      );
    }
  }, [response]);

  useEffect(() => {
    const reservationList = data as ReservationApiType;
    if (!isLoading && !error)
      setPendingReservation(
        reservationList.data
          .filter((reservation) => reservation.status === "pending")
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
      );
  }, [isLoading, error]);
  return (
    <>
      <Title>
        <h1 className="text-start text-3xl font-bold pl-4 text-white">
          Reservation
        </h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Pending Reservation
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link
                    to="all"
                    className="bg-primary text-white active:scale-95 hover:bg-primary/80 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </Link>
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
                      phone
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pendingReservation.map((reservation) => (
                    <tr key={reservation.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {reservation.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4 ">
                        {reservation.phone}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                        {reservation.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4">
                        <div className="flex justify-start text-2xl items-center gap-2">
                          <Tippy delay={300} content="more information">
                            <button
                              onClick={() => {
                                setShowInfoModal(true);
                                setSelectReservation(reservation);
                              }}
                              className="cursor-pointer transform hover:text-primary hover:scale-110"
                            >
                              <span>
                                <BsInfoCircle />
                              </span>
                            </button>
                          </Tippy>
                          <Tippy delay={300} content="Accept">
                            <button
                              onClick={() => {
                                setAcceptModal(true);
                                setSelectReservation(reservation);
                              }}
                              className="cursor-pointer transform hover:text-primary hover:scale-110"
                            >
                              <span>
                                <AiOutlineFileDone />
                              </span>
                            </button>
                          </Tippy>
                          <Tippy delay={300} content="Reject">
                            <button
                              onClick={() => {
                                setRejectModal(true);
                                setSelectReservation(reservation);
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={acceptModal}
          onClose={() => setAcceptModal(false)}
          text={`Do you really want to accept ${selectReservation?.name}'s reservation`}
          actionName="accept"
          isLoading={requestIsLoading}
          action={async () =>
            getRequest(`/api/admin/booking/accept/${selectReservation?.id}`)
          }
        />
        <ConfirmModal
          isOpen={rejectModal}
          onClose={() => setRejectModal(false)}
          text={`Do you really want to Reject ${selectReservation?.name}'s reservation`}
          actionName="Reject"
          isLoading={requestIsLoading}
          action={async () =>
            getRequest(`/api/admin/booking/reject/${selectReservation?.id}`)
          }
        />
        <Modal
          clickOutSide
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        >
          <h2 className="text-center text-purple capitalize my-4 font-bold text-2xl">
            reservation information
          </h2>
          <div className="w-full sm:w-10/12 mx-auto">
            <ReservationField title="name" text={selectReservation?.name} />
            <ReservationField title="date" text={selectReservation?.date} />
            <ReservationField title="email" text={selectReservation?.email} />
            <ReservationField
              title="number of people"
              text={`${selectReservation?.number_of_people}`}
            />
            <ReservationField title="phone" text={selectReservation?.phone} />
            <ReservationField
              title="party reason"
              text={selectReservation?.party_reason}
            />
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Reservation;
