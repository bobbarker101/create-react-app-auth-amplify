import React, { useState } from 'react';
import clsx from 'clsx';
import Table from './Table';
import ExpandableTable from './ExpandableTable/index'
//import { selectedRow } from './Table'
import Chip from "@material-ui/core/Chip";
import ChipInput from "material-ui-chip-input";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import EmojiEmotions from '@material-ui/icons/EmojiEmotions';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Switch,
  Grid,
  Container,
  Card,
  MenuItem,
  Button,
  List,
  ListItem,
  TextField,
  Select
} from '@material-ui/core';
import { toast } from "react-toastify";
import { API } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
API.configure(aws_exports);

export default function LivePreviewExample(props) {
   // console.log("subscriptions")
    //console.log(props)
    const styles = {
        container: {
            padding: 20,
            borderTop: "1px #4C758F solid",
            marginBottom: 20
        },
        form: {
            display: "flex"
        },
        input: {
            color: "inherit",
            background: "none",
            outline: "none",
            border: "none",
            flex: 1,
            fontSize: 16
        },
        getEmojiButton: {
            cssFloat: "right",
            border: "none",
            margin: 0,
            cursor: "pointer"
        },
        emojiPicker: {
            position: "absolute",
            bottom: 10,
            right: 0,
            cssFloat: "right",
            marginLeft: "200px"
        }
    };
    const {  user, senders, subscriptions, subscribers } = props;
    const [state, changeState] = useState({
        tableData: {
            data: [...subscriptions, ...subscribers],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });
    const [selectedRow, setSelectedRow] = React.useState(null);


    const codeLookup = {};
    if(senders.length>0) {
        senders.map((sender) => codeLookup[sender.PK_senderId] === sender.PK_senderId);
    }
    const defaultValue = [state.tableData.data[selectedRow]?state.tableData.data[selectedRow].subscriptionId:''];
    const comonscol = [
        { title: "Name", field: "subscriptionGroupName", cellStyle: (rowDataArray, rowData) => {
                const paddingLeft = rowData.tableData ? 30 * rowData.tableData.path.length : 0;
                return ({ paddingLeft: paddingLeft});
            } },
        { title: "Count", field: "subscriberCount", editable: 'never' },
        { title: "Code", field: "number", editable: 'never'},
        { title: "Phone", field: "SK_subscriberId", editable: 'never'},
        { title: "Group ID", field: "subscriptionId", editable: 'never' },


    ];
    const [activeTab, setActiveTab] = useState('1');
console.log(state.tableData);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [checked1, setChecked1] = useState(false);

  const toggleCheck1 = () => {
    setChecked1(!checked1);
  };

  const [checked2, setChecked2] = useState(false);

  const toggleCheck2 = () => {
    setChecked2(!checked2);
  };

  const [country, setCountry] = useState('');


    const [formState, setFormState] = useState({
        group: '',
        text: '',
        buttonclicked: false
    });
    const handleChange = e => {
        e.preventDefault();
        setFormState({ group: formState.group, buttonclicked: formState.buttonclicked, text: e.target.value });
    };
   const addEmoji = e => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach(el => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setFormState({
            group: formState.group,
            text: formState.text + emoji,
            buttonclicked: false
        });
    };
   const onEmojiClickButton = e => {
       e.preventDefault();
        setFormState({
            group: formState.group,
            text: formState.text,
            buttonclicked: true
        });

   };
    const onSendClickButton = e => {
        e.preventDefault();
        console.log(state.tableData.data[selectedRow].subscriptionId)
        console.log(formState.text)

        let apiName = 'MobileHelmV5';
        let path = '/v5/messages/subscriptions';
        let myInit = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': "RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE"
            },
            body: {
                "subscriptionId": state.tableData.data[selectedRow].subscriptionId,
                "message": formState.text,
            }
        };
        API.post(apiName, path, myInit)
            .then((result) => {
                console.log('result');
                console.log(result);
                if(result.success){
                    toast.success(result.success);
                    toast.success("Messages Sent " + result.body['Messages Sent'])
                }


            })
            .catch((error) => {
                console.log('ERROR');
                console.log(error);
                return error;
            });


    };
//console.log(props)
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

  return (
    <>
      <Card>
        <div className="card-header  d-flex align-items-center justify-content-between card-header-alt p-0">
          <List
            component="div"
            className="w-100 nav-line justify-content-center d-flex nav-line-alt nav-tabs-primary">
            <ListItem
              button
              className="p-4 font-size-md rounded-0"
              selected={activeTab === '1'}
              onClick={() => {
                toggle('1');
              }}>
              <span className="font-weight-bold font-size-sm text-uppercase">
                Send Message to Group
              </span>
              <div className="divider" />
            </ListItem>
          </List>
        </div>
        <div className="px-0 py-0 py-lg-4">
            <div
                className={clsx('tab-item-wrapper', { active: activeTab === '1' })}
                index={1}>
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={6} >
                        <Grid item md={6}>
                            <Card className="card-box mb-4 p-3">
                                <h4 className=" mt-3">Send Message</h4>
                                <div className="divider mt-5 mb-4" />
                                <div className="mb-4">
                                    <label className="font-weight-bold mb-2">Group</label>
                                    <br/>
                                    <Chip label={ state.tableData.data[selectedRow]
                                        ? "Send " +state.tableData.data[selectedRow].subscriberCount
                                        + " messages to group "
                                        + state.tableData.data[selectedRow].subscriptionGroupName
                                        :'' }/>
                                    <p>
                                        Click the table to select group
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <label className="font-weight-bold mb-2">Message</label>
                                    <TextField
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Great job team..."
                                        minrows={5}
                                        value={formState.text}
                                        onChange={handleChange}

                                    />
                                    <button onClick={onEmojiClickButton}>
                                        <img
                                            className="emoji-icon"
                                            alt="true"
                                            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                            onClick={() => setShowPicker((val) => !val)}
                                        />
                                    </button>
                                    {formState.buttonclicked &&
                                        <span style={styles.emojiPicker}>
                                          <Picker onSelect={addEmoji} />
                                        </span>
                                    }
                                    {/*<Picker onSelect={addEmoji} />*/}

                                </div>
                                <div className="divider mt-5 mb-4" />
                                <Container className="d-flex align-items-center justify-content-end">
                                    <div className="py-4">
                                        <Button size="large" onClick={onSendClickButton} className="btn-success font-weight-bold">
                                            Send Message {state.tableData.data[selectedRow]?"to group "+state.tableData.data[selectedRow].subscriptionGroupName:''}
                                        </Button>
                                    </div>
                                </Container>
                            </Card>
                        </Grid>

                        <Grid item md={6}>
                            <div className="mb-4">
                                    <Table tableData={state.tableData} comonscol={comonscol} selectedRow={selectedRow} setSelectedRow={setSelectedRow}/>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
      </Card>
    </>
  );
}
