import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CustomInputNumber.css";
import CustomInputNumber from "./CustomInputNumber.jsx";

const RoomAllocation = (props) => {
  const [guestTotal, setGuestTotal] = useState(props.guest);
  const [roomTotal, setRoomTotal] = useState(props.room);
  const [adult, setAdult] = useState(0); // default set: adult
  const [remainGuest, setRemainGuest] = useState(guestTotal);
  const [warning, setWarning] = useState("");
  const [result, setResult] = useState([]);
  const [resultDisable, setResultDisable] = useState([]);

  const defaultRoom = { adult: 1, child: 0 };
  const defaultRoomDisable = {
    adult: 1,
    child: 0,
    adultDisable: false,
    childDisable: false,
  };
  const defaultRoomDisableTrue = {
    adult: 1,
    child: 0,
    adultDisable: true,
    childDisable: true,
  };

  useEffect(() => {
    if (guestTotal - roomTotal < 0) {
      setWarning("不能分配，總人數需最少等於房間數量");
      setRemainGuest(guestTotal);
    } else if (guestTotal == roomTotal) {
      setWarning("");
      setRemainGuest(0);
      if (guestTotal > 0 && roomTotal > 0) {
        let newList = Array(Number(guestTotal)).fill(defaultRoom);
        setResult(newList);
        // disable all btn
        let newListDisable = Array(Number(guestTotal)).fill(
          defaultRoomDisableTrue
        );
        setResultDisable(newListDisable);
      }
    } else if (guestTotal - roomTotal * 4 > 0) {
      setWarning("總人數已超過房間可容納數量，房間皆為四人房");
      setRemainGuest(guestTotal);
    } else {
      setWarning("");
      setAdult(roomTotal);
      setRemainGuest(guestTotal - roomTotal);
      let newList = Array(Number(roomTotal)).fill(defaultRoom);
      setResult(newList);
      // allocation
      let newListDisable = Array(Number(roomTotal)).fill(defaultRoomDisable);
      setResultDisable(newListDisable);
    }
  }, [guestTotal, roomTotal]);

  useEffect(() => {
    // alert(`Your result: ${JSON.stringify(result)}`);
    props.onChange(result);
  }, [result]);

  const renderBook = (item) => {
    return (
      <div className="room-section">
        房間：{item.adult + item.child} 人
        <div className="square-inline room-list">
          <div className="room-lable">
            <div>大人</div>
            <div className="desc">年齡 20+</div>
          </div>
          <div className="room-count">
            <CustomInputNumber
              min={1}
              max={4} // todo
              step={1}
              value={item.adult}
              name={"totalAdultARoom"}
              disabled={item.adultDisable}
              //   onChange//
              //   onBlur={} //
            />
          </div>
        </div>
        <div className="square-inline room-list">
          <div className="room-lable">
            <div>小孩</div>
          </div>
          <div className="room-count">
            <CustomInputNumber
              min={0}
              max={3} // todo
              step={1}
              value={item.child}
              name={"totalChildARoom"}
              disabled={item.childDisable}
            />
          </div>
        </div>
        <div className="seperater" />
      </div>
    );
  };

  return (
    <div>
      <div className="square-inline">
        住客人數：
        <input
          className="square square_input"
          type="number"
          //   min={props.min}
          //   max={props.max}
          step={props.step}
          name="guestTotal"
          value={guestTotal}
          disabled={false}
          onChange={(event) => setGuestTotal(event.target.value)}
        />
        人/
        <input
          className="square square_input"
          type="number"
          //   min={props.min}
          //   max={props.max}
          step={props.step}
          name="roomTotal"
          value={roomTotal}
          disabled={false}
          onChange={(event) => setRoomTotal(event.target.value)}
        />
        房
      </div>
      {warning === "" ? null : (
        <div className="message warn">
          <p className="warn-text"> 提醒： {warning} </p>
        </div>
      )}
      <div className="message">
        <p>尚未分配人數： {remainGuest} 人</p>
      </div>

      {warning === "" && guestTotal > 0 && roomTotal > 0
        ? resultDisable.map((item, index) => (
            <div key={index}>{renderBook(item)}</div>
          ))
        : null}
    </div>
  );
};

RoomAllocation.propTypes = {
  step: PropTypes.number,
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
RoomAllocation.defaultProps = {
  step: 1,
};

export default RoomAllocation;
