class GetDataSpec {
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
}

export default GetDataSpec;
