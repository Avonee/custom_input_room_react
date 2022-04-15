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

        let filledArray = new Array(Number(roomTotal));
        for (let i = 0; i < Number(roomTotal); i++) {
          filledArray[i] = {
            adult: 1,
            child: 0,
            adultDisable: true,
            childDisable: true,
            totalPeople: 4,
          };
          filledArray[i].id = i;
        }

        setResultDisable(filledArray);
      }
    } else if (guestTotal - roomTotal * 4 > 0) {
      setWarning("總人數已超過房間可容納數量，房間皆為四人房");
      setRemainGuest(guestTotal);
    } else {
      setWarning("");
      setAdult(roomTotal);
      setRemainGuest(guestTotal - roomTotal);

      let newList = new Array(Number(roomTotal));
      for (let i = 0; i < Number(roomTotal); i++) {
        newList[i] = {
          adult: 1,
          child: 0,
        };
      }
      setResult(newList);

      // allocation
      let filledArray = new Array(Number(roomTotal));
      for (let i = 0; i < Number(roomTotal); i++) {
        filledArray[i] = {
          adult: 1,
          child: 0,
          adultDisable: false,
          childDisable: false,
          totalPeople: 4,
        };
        filledArray[i].id = i;
      }
      setResultDisable(filledArray);
    }
  }, [guestTotal, roomTotal]);

  useEffect(() => {
    // alert(`Your result: ${JSON.stringify(result)}`);
    props.onChange(result);
  }, [result]);

  const changeResult = (event, index, name) => {
    let newData;
    let getRoomSet = resultDisable.find((i) => i.id === index);

    if (remainGuest > 0) {
      if (name === "totalAdultARoom") {
        getRoomSet.adult = event;
      } else {
        getRoomSet.child = event;
      }
    } else if (remainGuest == 0) {
      // could only count down
      if (name === "totalAdultARoom") {
        if (getRoomSet.adult - event >= 0) {
          getRoomSet.adult = event;
        }
      } else {
        if (getRoomSet.child - event >= 0) {
          getRoomSet.child = event;
        }
      }
    }

    newData = [...resultDisable];
    newData.splice(index, 1, getRoomSet);
    setResultDisable(newData);

    let new_sumAll = 0;
    newData.forEach((data) => {
      new_sumAll += data.adult;
      new_sumAll += data.child;
    });
    setRemainGuest(guestTotal - new_sumAll);

    // setResult
  };

  const renderBook = (item, index) => {
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
              max={
                remainGuest > 0
                  ? item.totalPeople - item.child
                  : item.adult + item.child - item.child
              }
              step={1}
              value={item.adult}
              name={"totalAdultARoom"}
              disabled={item.adultDisable}
              onChange={(event) =>
                changeResult(event, index, "totalAdultARoom")
              }
              //   onBlur={(event) => changeLock(event, index, "totalAdultARoom")}
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
              max={
                remainGuest > 0
                  ? item.totalPeople - item.adult
                  : item.adult + item.child - item.adult
              }
              step={1}
              value={item.child}
              name={"totalChildARoom"}
              disabled={item.childDisable}
              onChange={(event) =>
                changeResult(event, index, "totalChildARoom")
              }
              //   onBlur={(event) => changeLock(event, index, "totalChildARoom")}
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
            <div key={index}>{renderBook(item, index)}</div>
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
