import meetups from '../data/meetups';

class GetDataSpec {
  /**
  * @Static
  * @description return the array of all the meetup records according to the given specifications
  * @memberof questionerController
  */
  static getMeetupSpec() {
    const SpecArray = [];
    meetups.forEach((member) => {
      const {
        id, title, location, happeningOn, tags,
      } = member;
      const obj = {
        id, title, location, happeningOn, tags,
      };
      SpecArray.push(obj);
    });
    return SpecArray;
  }

  /**
  * @Static
  * @description return the array of upcoming meetup records according to the given specifications
  * @memberof questionerController
  */
  static getUpComingSpec() {
    const SpecArray = [];
    meetups.forEach((member) => {
      if (member.happeningOn > new Date().toJSON()) {
        const {
          id, title, location, happeningOn, tags,
        } = member;
        const obj = {
          id, title, location, happeningOn, tags,
        };
        SpecArray.push(obj);
      }
    });
    return SpecArray;
  }
}

export default GetDataSpec;
