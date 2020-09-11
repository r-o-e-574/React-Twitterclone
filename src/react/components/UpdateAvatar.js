import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateavi } from "../../redux";
import features from "./AvatarFeatures";
import "./UpdateAvatar.css";
// import UserAvatar from "./UserAvatar";
import Avatar from 'avataaars';
import { Container, Card, Button, Typography, CssBaseline } from '@material-ui/core';
// import {InputLabel, MenuItem, FormControl, Select,} from '@material-ui/core';

class UpdateAvatar extends React.Component {
  state = {
    features: {
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
    },
    show: false,
    save: false
  }

  submitForm = e => {
    e.preventDefault();
    this.props.updateavi(this.state.features);
    this.setState({
      updatedAvi: !this.state.updatedAvi,
      save: !this.state.save
    });
  };

  handleChange = e => {
    e.preventDefault();
    const features = { ...this.state.features } //copy made
    features[e.target.name] = e.target.value;
    this.setState({
      features,
      show: !this.state.show
    });

  };

  randomAvatar = e => {
    const topType = features.topType[Math.floor(Math.random() * 31)];
    const accessoriesType = features.accessoriesType[Math.floor(Math.random() * 7)];
    const hairColor = features.hairColor[Math.floor(Math.random() * 10)];
    const hatColor = features.hatColor[Math.floor(Math.random() * 16)];
    const facialHairType = features.facialHairType[Math.floor(Math.random() * 6)];
    const clotheType = features.clotheType[Math.floor(Math.random() * 9)];
    const clotheColor = features.clotheColor[Math.floor(Math.random() * 16)];
    const graphicType = features.graphicType[Math.floor(Math.random() * 11)];
    const eyeType = features.eyeType[Math.floor(Math.random() * 12)];
    const eyebrowType = features.eyebrowType[Math.floor(Math.random() * 12)];
    const mouthType = features.mouthType[Math.floor(Math.random() * 12)];
    const skinColor = features.skinColor[Math.floor(Math.random() * 7)];
    this.setState({
      features: {
        topType,
        accessoriesType,
        hairColor,
        hatColor,
        facialHairType,
        clotheType,
        clotheColor,
        graphicType,
        eyeType,
        eyebrowType,
        mouthType,
        skinColor
      },
      show: !this.state.show
    })
  };

  render() {
    console.log(this.state.features);
    const user = this.props.loggedInUsername; //copy of store state from below
    return (
      <>
        <Container id="avatarContainer">
          <CssBaseline />
          <Card elevation={8} id="updateAvi">
            <Typography id="update-title" variant="h5" component="h1">Update your avatar below</Typography>
            {this.state.show &&
              <Container id="avatarPreview">
                <Typography id="random-preview" variant="h5" component="h1">Preview</Typography>
                <Avatar
                avatarStyle='Circle'
                topType={this.state.features.topType}
                accessoriesType ={this.state.features.accessories}
                hairColor={this.state.features.hairColor}
                facialHairType={this.state.features.facialHair}
                clotheType={this.state.features.clotheType}
                clotheColor={this.state.features.clotheType}
                graphicType={this.state.features.graphicType}
                eyeType={this.state.features.eyeType}
                eyebrowType={this.state.features.eyebrowType}
                mouthType={this.state.features.mouthType}
                skinColor={this.state.features.skinColor}
                  />
        </Container>
      }
        <Button id="random" variant="contained" onClick={this.randomAvatar}> Random Avatar </Button>
        <Button id = "save-changes" variant="contained" onClick={this.submitForm}> Save Changes </Button>
        {this.state.updatedAvi &&
            <Button component={ Link } to={{
              pathname:`/profiles/${user}`, 
              aboutProps:{
                username: user
              }
            }} variant="contained" id="view-changes" >View Changes</Button>
        }
        </Card>
        </Container>
        {/* {this.state.save &&
            <UserAvatar
              updated={this.state.save}
            />
      } */}
      </>
    );
  }
}

//export default UpdateAvatar;
export default connect(
  state => ({
    result: state.users.updateavi.result,
    loggedInUsername: state.auth.login.result.username
  }),
  { updateavi } //dispatchable things to add
)(UpdateAvatar);

