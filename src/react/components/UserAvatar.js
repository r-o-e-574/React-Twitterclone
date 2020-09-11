import React from "react";
import Avatar from 'avataaars';
import { connect } from "react-redux";
import { getavi, updateavi } from "../../redux";
//import features from "./AvatarFeatures.js"


class UserAvatar extends React.Component {
  state = {
    topType: 'NoHair',
    accessoriesType: 'Blank',
    hairColor: 'null',
    hatColor: 'null',
    facialHairType: 'Blank',
    clotheType: 'ShirtCrewNeck',
    clotheColor: 'Gray01',
    graphicType: 'Skull',
    eyeType: 'Default',
    eyebrowType: 'Default',
    mouthType: 'Default',
    skinColor: 'Light'
  }

  componentDidMount() {
    this.props.getavi()
  }

  render() {
    const { result } = this.props
    //console.log(result);
    let updated, 
        avatar, 
        topType, 
        accessoriesType,
        hairColor,
        facialHairType,
        clotheType,
        clotheColor,
        graphicType,
        eyeType, 
        eyebrowType, 
        mouthType, 
        skinColor; 
    if(result !== null){   
         updated = result.updated;
         avatar = result.avatar;
         topType = avatar.topType;
         accessoriesType = avatar.accessories;
         hairColor = avatar.hairColor;
         facialHairType = avatar.facialHair
         clotheType = avatar.clotheType;
         clotheColor = avatar.clotheColor;
         graphicType = avatar.graphicType;
         eyeType = avatar.eyeType;
         eyebrowType = avatar.eyebrowType;
         mouthType = avatar.mouthType;
         skinColor = avatar.skinColor;
      }

    return (
      <>
        {updated ?
          <Avatar
            avatarStyle='Circle'
            topType={topType}
            accessoriesType={accessoriesType}
            hairColor={hairColor}
            facialHairType={facialHairType}
            clotheType={clotheType}
            clotheColor={clotheColor}
            graphicType={graphicType}
            eyeType={eyeType}
            eyebrowType={eyebrowType}
            mouthType={mouthType}
            skinColor={skinColor}
          />
          :
        <Avatar
          avatarStyle='Circle'
          topType={this.state.topType}
          accessoriesType={this.state.accessories}
          hairColor={this.state.hairColor}
          facialHairType={this.state.facialHair}
          clotheType={this.state.clotheType}
          clotheColor={this.state.clotheType}
          eyeType={this.state.eyeType}
          eyebrowType={this.state.eyebrowType}
          mouthType={this.state.mouthType}
          skinColor={this.state.skinColor}
        />
  }

      </>
    );
  }
}

export default connect(
  state => ({
    result: state.users.getavi.result,
  }),
  { getavi, updateavi } //dispatchable things to add
)(UserAvatar);