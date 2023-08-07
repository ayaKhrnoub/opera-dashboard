import React, { useEffect, useState } from "react";
import InformationField from "./InformationField";
type PropsTypes = {
  data: string;
};

type TicketType = {
  id: number;
  user_id: number;
  party_id: number;
  booked_seat_number: string;
  username: string;
  party_name: string;
  created_at: string;
  updated_at: string;
};

const TicketDetail: React.FC<PropsTypes> = ({ data }) => {
  const [ticketDetail, setTicketDetail] = useState<TicketType>({
    id: 0,
    user_id: 0,
    party_id: 0,
    booked_seat_number: "0",
    username: "",
    party_name: "",
    created_at: "",
    updated_at: "",
  });
  useEffect(() => {
    const ticket = JSON.parse(data) as TicketType;
    setTicketDetail(ticket);
  }, [data]);
  return (
    <div className="w-full sm:w-10/12 mx-auto">
      <h2 className="text-center py-2 text-3xl font-semibold text-primary">ticket detail</h2>
      <InformationField title="username" text={ticketDetail?.username} />
      <InformationField title="party" text={ticketDetail?.party_name} />
      <InformationField
        title="seats number"
        text={ticketDetail?.booked_seat_number}
      />
      <InformationField
        title="booking date"
        text={ticketDetail?.created_at.slice(0, 10)}
      />
    </div>
  );
};

export default TicketDetail;
