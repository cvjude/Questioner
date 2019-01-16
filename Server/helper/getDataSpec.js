class GetDataSpec {
  /**
  * @Static
  * @description return the array of all the meetup records according to the given specifications
  * @memberof questionerController
  */
  static getMeetupSpec(meetups, addId = true) {
    const SpecArray = [];
    let obj = {};
    meetups.forEach((member) => {
      const {
        id, title, location, happeningon, tags,
      } = member;
      const happeningOn = new Date(happeningon).toDateString();
      if (addId) {
        obj = {
          id, title, location, happeningOn, tags,
        };
      } else {
        obj = {
          title, location, happeningOn, tags,
        };
      }
      SpecArray.push(obj);
    });
    return SpecArray;
  }

  /**
  * @Static
  * @description return the array of upcoming meetup records according to the given specifications
  * @memberof questionerController
  */
  static getUpComingSpec(meetups) {
    const SpecArray = [];
    meetups.forEach((member) => {
      const date = new Date(member.happeningon).getTime();
      if (date > new Date().getTime()) {
        const {
          id, title, location, tags,
        } = member;
        const happeningOn = new Date(member.happeningon).toDateString();
        const obj = {
          id, title, location, happeningOn, tags,
        };
        SpecArray.push(obj);
      }
    });
    return SpecArray;
  }

  /**
  * @Static
  * @description return the array of all the meetup records according to the given specifications
  * @memberof questionerController
  */

  static getQuestionSpec(meetups, addId = true) {
    const SpecArray = [];
    let obj = {};
    meetups.forEach((member) => {
      const {
        id, createdby, title, meetupid, body,
      } = member;
      const user = createdby;
      const meetup = meetupid;
      if (addId) {
        obj = {
          id, user, title, meetup, body,
        };
      } else {
        obj = {
          user, title, meetup, body,
        };
      }

      SpecArray.push(obj);
    });

    return SpecArray;
  }

  /**
  * @Static
  * @description return the array of all the meetup records according to the given specifications
  * @memberof questionerController
  */
  static getVoteSpec(meetups, removeId = true) {
    const SpecArray = [];
    let obj = {};
    meetups.forEach((member) => {
      const {
        id, meetup, title, body, votes,
      } = member;
      if (removeId) {
        obj = {
          id, meetup, title, body, votes,
        };
      } else {
        obj = {
          title, body, meetup, votes,
        };
      }
      SpecArray.push(obj);
    });
    return SpecArray;
  }
}

export default GetDataSpec;
