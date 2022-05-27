/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  TextField,
  Button,
  Container,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Card, Row, Col, Form, Accordion } from 'react-bootstrap';

import { Input, FormGroup } from 'reactstrap';
import React, { useCallback, useState, useMemo } from 'react';
import { useEventHandlers } from '@react-leaflet/core';
import './Css/Search.scss';
import '../index.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  useMap,
  useMapEvent,
  Rectangle,
} from 'react-leaflet';
import noImg from '../images/no-image.png';
import { Icon } from 'leaflet';
import { withRouter } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { BiInfoCircle } from 'react-icons/bi';

import { useTranslation } from 'react-i18next';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent('click', onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function SearchPageProject(props) {
  const { t } = useTranslation();

  const [count_projects, setcount_projects] = React.useState(0);
  const [count_in_country, setcount_in_country] = React.useState(0);
  const [count_out_country, setcount_out_country] = React.useState(0);
  const [count_rmuti_university, setcount_rmuti_university] = React.useState(0);
  const [count_other_university, setcount_other_university] = React.useState(0);
  const [projects, setProjects] = React.useState([]);
  const [universitys, setUniversitys] = React.useState([]);
  const [other_universitys, setother_universitys] = React.useState([]);
  const [searchTitle, setSearchTitle] = React.useState('');

  const [message, setMessage] = React.useState('');
  const [selected2, setSelected2] = React.useState(2);
  const [selected5, setSelected5] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [check2, setcheck2] = React.useState(true);
  const [check5, setcheck5] = React.useState(true);

  // const [previousValue] = React.useState([]);

  const apiUrl = 'https://kmapi.kims-rmuti.com';

  const getRequestParams = (title, typetwo, typefive) => {
    let params = {};

    if (typetwo) {
      params['typeTwo'] = typetwo;
    } else {
      params['typeTwo'] = '';
    }

    if (typefive) {
      params['typeFive'] = typefive;
    } else {
      params['typeFive'] = '';
    }

    if (title !== undefined) {
      params['title'] = title;
    }

    return params;
  };

  const retrieveProjects = () => {
    setLoading(true);

    const params = getRequestParams(searchTitle, selected2, selected5);

    axios
      .get(`${apiUrl}/api/get/us-projects-service`, { params })
      .then((res) => {
        setcount_projects(res.data.count_projects);
        setcount_in_country(res.data.count_in_country);
        setcount_out_country(res.data.count_out_country);
        setcount_rmuti_university(res.data.count_rmuti_university);
        setcount_other_university(res.data.count_other_university);
        setProjects(res.data.projects);
        setUniversitys(res.data.rmuti_universitys);
        setother_universitys(res.data.other_university);
      })
      .finally(() => {
        setMessage('');
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    retrieveProjects();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleChange2 = (event) => {
    setcheck2(!check2);

    if (check2 === false) {
      setSelected2(2);
    }

    if (check2 === true) {
      setSelected2('');
      console.log(selected2);
    }
  };

  const handleChange5 = (event) => {
    // console.log(event.target.value);
    setcheck5(!check5);

    if (check5 === false) {
      setSelected5(5);
    }

    if (check5 === true) {
      setSelected5('');
      console.log(selected5);
    }
  };

  function MinimapControl({ position, zoom }) {
    const parentMap = useMap();
    const mapZoom = zoom || 0;

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 120, width: 200 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          {projects.map((p) => (
            <CircleMarker
              // key={index}
              center={[
                p.project_latitude ? p.project_latitude : 0,
                p.project_longitude ? p.project_longitude : 0,
              ]}
              // radius={10}
              opacity={0}
            >
              <Marker
                position={[
                  p.project_latitude ? p.project_latitude : 0,
                  p.project_longitude ? p.project_longitude : 0,
                ]}
                icon={
                  new Icon({
                    iconUrl:
                      p.project_type_id === 1
                        ? 'https://researcher.kims-rmuti.com/icon/R.jpg'
                        : p.project_type_id === 2
                        ? 'https://researcher.kims-rmuti.com/icon/AS.jpg'
                        : p.project_type_id === 5
                        ? 'https://researcher.kims-rmuti.com/icon/U2T.jpg'
                        : 'https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png',
                    iconSize: [10, 11],
                    // iconAnchor: [19, 0],
                    className: 'minimap-image-icon',
                  })
                }
              >
                <IconButton
                  color='primary'
                  aria-label='view info co'
                  style={{
                    marginTop: '10px',
                    fontFamily: 'Prompt',
                    fontSize: '15px',
                  }}
                ></IconButton>
              </Marker>
            </CircleMarker>
          ))}

          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      []
    );

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className={positionClass}>
        <div className='leaflet-control leaflet-bar'>{minimap}</div>
      </div>
    );
  }

  return (
    <body className='bg'>
      <div className='body-detail '>
        <div>
          <div>
            <Container maxWidth={false}>
              <Card
                className='card-border'
                style={{ backgroundColor: '#f6a834', borderRadius: '15px' }}
              >
                <Card.Body>
                  <div className=''>
                    <Box
                      component='form'
                      sx={{
                        '& .MuiTextField-root': {
                          m: 2,
                          width: '100%',
                          marginTop: '-15px',
                        },
                      }}
                      noValidate
                      autoComplete='off'
                    >
                      <div>
                        <Row className='align-items-center justify-content-md-center'>
                          <Col md='6' xs='12'>
                            <TextField
                              id='standard-helperText'
                              label={t('research.menu4')}
                              defaultValue='Default Value'
                              helperText={t('research.menu3')}
                              InputProps={{ style: { fontFamily: 'Prompt' } }}
                              InputLabelProps={{
                                style: { fontFamily: 'Prompt' },
                              }}
                              FormHelperTextProps={{
                                style: { fontFamily: 'Prompt' },
                              }}
                              variant='standard'
                              value={searchTitle}
                              onChange={onChangeTitle}
                            />

                            <Form
                              id='outlined-multiline-flexible'
                              multiline
                              Input
                              type='checkbox'
                              InputLabelProps={{
                                style: { fontFamily: 'Prompt' },
                              }}
                              InputProps={{ style: { fontFamily: 'Prompt' } }}
                              FormHelperTextProps={{
                                style: { fontFamily: 'Prompt' },
                              }}
                              label='ประเภทงานบริการวิชาการ'
                              // value={selected1}
                              // onChange={handleChange}
                              helperText='โปรดเลือก'
                            >
                              <FormGroup
                                check
                                inline
                                style={{ fontFamily: 'Prompt' }}
                              >
                                <div>
                                  <img
                                    width='45'
                                    height='45'
                                    aria-label='Placeholder: Image'
                                    preserveAspectRatio='xMidYMid slice'
                                    src={`https://researcher.kims-rmuti.com/icon/AS.jpg`}
                                    style={{ padding: '11px' }}
                                  />
                                  <Input
                                    type='checkbox'
                                    onChange={handleChange2}
                                    value={selected2}
                                    checked={check2}
                                    style={{ marginTop: '15px' }}
                                  />
                                  {t('research.menu1')}
                                </div>
                              </FormGroup>

                              <FormGroup
                                check
                                inline
                                style={{ fontFamily: 'Prompt' }}
                              >
                                <div>
                                  <Input
                                    type='checkbox'
                                    onChange={handleChange5}
                                    value={selected5}
                                    checked={check5}
                                    style={{ marginTop: '15px' }}
                                  />
                                  <img
                                    width='45'
                                    height='45'
                                    aria-label='Placeholder: Image'
                                    preserveAspectRatio='xMidYMid slice'
                                    src={`https://researcher.kims-rmuti.com/icon/U2T.jpg`}
                                    style={{ padding: '11px' }}
                                  />
                                  {t('research.menu2')}
                                </div>
                              </FormGroup>
                            </Form>
                          </Col>

                          <Col md='1' xs='12'>
                            <Button
                              variant='contained'
                              color='primary'
                              size='large'
                              type='submit'
                              onClick={retrieveProjects}
                              style={{
                                fontFamily: 'Prompt',
                                width: '100%',
                                backgroundColor: 'rgb(239, 125, 5)',
                              }}
                              disabled={loading}
                              startIcon={<FaSearch size={13} />}
                            >
                              {loading && <CircularProgress size={22} />}
                              {!loading && t('search')}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Box>
                  </div>
                </Card.Body>
              </Card>
              <div className='card-searcher'>
                <Row>
                  <Col sm={12}>
                    <Card
                      className='card-border'
                      style={{
                        marginTop: '10px',
                        fontFamily: 'Prompt',
                        borderRadius: '15px',
                        boxShadow: 'none',
                        border: 'none',
                      }}
                    >
                      <MapContainer
                        center={[13, 102]}
                        zoom={6}
                        // scrollWheelZoom={true}
                        minZoom={3}
                        maxZoom={21}
                        zoomControl={false}
                        style={{
                          width: '100%',
                          minHeight: '450px',
                          height: '65vh',
                          margin: '0',
                          zIndex: '0',
                          borderRadius: '15px',
                        }}
                      >
                        <TileLayer
                          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        {!message
                          ? projects.map((p, index) => {
                              return (
                                <CircleMarker
                                  key={index}
                                  center={[
                                    p.project_latitude ? p.project_latitude : 0,
                                    p.project_longitude
                                      ? p.project_longitude
                                      : 0,
                                  ]}
                                  // radius={10}
                                  opacity={0}
                                >
                                  <Marker
                                    position={[
                                      p.project_latitude
                                        ? p.project_latitude
                                        : 0,
                                      p.project_longitude
                                        ? p.project_longitude
                                        : 0,
                                    ]}
                                    icon={
                                      new Icon({
                                        iconUrl:
                                          parseInt(p.project_type_id) === 1
                                            ? 'https://researcher.kims-rmuti.com/icon/R.jpg'
                                            : parseInt(p.project_type_id) === 2
                                            ? 'https://researcher.kims-rmuti.com/icon/AS.jpg'
                                            : parseInt(p.project_type_id) === 5
                                            ? 'https://researcher.kims-rmuti.com/icon/U2T.jpg'
                                            : 'https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png',
                                        iconSize: [26, 26],
                                        // iconAnchor: [19, 0],
                                        className: 'image-icon',
                                      })
                                    }
                                  >
                                    <Popup>
                                      <Card.Title class='tip__container'>
                                        <text
                                          style={{
                                            marginTop: '10px',
                                            fontFamily: 'Prompt',
                                            fontSize: '20px',
                                          }}
                                        >
                                          งานบริการวิชาการ
                                        </text>
                                        <hr />

                                        <text
                                          style={{
                                            marginTop: '10px',
                                            fontFamily: 'Prompt',
                                            fontSize: '15px',
                                          }}
                                        >
                                          {p.project_name_th}
                                        </text>
                                        <hr />

                                        <IconButton
                                          color='primary'
                                          aria-label='view info co'
                                          onClick={() => {
                                            console.log(p.concept_id);
                                            p.project_id
                                              ? props.history.push({
                                                  pathname:
                                                    '/ProjectDetail/ProjectNetwork',
                                                  search: `?project_id=${btoa(
                                                    p.project_id
                                                  )}`,
                                                })
                                              : props.history.push({
                                                  pathname:
                                                    '/ProjectDetailConcep/ProjectNetwork',
                                                  search: `?concep_id=${btoa(
                                                    p.concept_id
                                                  )}`,
                                                });
                                          }}
                                          style={{
                                            marginTop: '10px',
                                            fontFamily: 'Prompt',
                                            fontSize: '15px',
                                          }}
                                        >
                                          รายละเอียดเพิ่มเติม{' '}
                                          <BiInfoCircle size={18} />
                                        </IconButton>
                                      </Card.Title>
                                    </Popup>
                                  </Marker>
                                </CircleMarker>
                              );
                            })
                          : null}
                        <MinimapControl position='topright' />
                      </MapContainer>
                    </Card>
                  </Col>
                  <Col sm={12}>
                    <div
                      className='dashboard'
                      style={{ marginTop: '-4.5rem', marginBottom: '-1rem' }}
                    >
                      <div className='all-card'>
                        <Row>
                          <Col>
                            <div className='card'>
                              <div className='card-body '>
                                <h5 className='card-title text-title'>
                                  มทร.อีสาน
                                </h5>
                                <h2 className='card-text text-amount'>
                                  {count_rmuti_university} วิทยาเขต
                                </h2>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className='card'>
                              <div className='card-body '>
                                <h5 className='card-title text-title'>
                                  งานวิจัยมทร.อีสาน
                                </h5>
                                <h2 className='card-text text-amount'>
                                  {count_projects} โครงการ{' '}
                                </h2>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className='card'>
                              <div className='card-body '>
                                <h5 className='card-title text-title'>
                                  งานวิจัยเครือข่าย
                                </h5>
                                <h2 className='card-text text-amount'>
                                  {count_other_university} โครงการ
                                </h2>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className='card'>
                              <div className='card-body '>
                                <h5 className='card-title text-title'>
                                  ภายในประเทศ
                                </h5>
                                <h2 className='card-text text-amount'>
                                  {count_in_country} โครงการ
                                </h2>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className='card'>
                              <div className='card-body '>
                                <h5 className='card-title text-title'>
                                  ภายนอกประเทศ
                                </h5>
                                <h2 className='card-text text-amount'>
                                  {count_out_country} โครงการ
                                </h2>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12}>
                    <Accordion
                      style={{ padding: '10px 25px 0 25px' }}
                      className='bg-title'
                      defaultActiveKey='0'
                    >
                      <Accordion.Item
                        eventKey='0'
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                        }}
                      >
                        <Accordion.Header>
                          <h2
                            style={{
                              textAlign: 'left',
                              color: '#fff',
                              fontWeight: '600',
                              marginBottom: '2rem',
                            }}
                          >
                            งานวิจัยเครือข่าย
                          </h2>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row style={{ paddingLeft: '1rem' }}>
                            {universitys.length ? (
                              <>
                                {universitys
                                  .sort((x, y) =>
                                    x.name.localeCompare(y.name, 'th')
                                  )
                                  .map((list) => (
                                    <Col
                                      xs
                                      sm={12}
                                      md
                                      lg={6}
                                      xl={6}
                                      xxl={4}
                                      style={{ paddingBottom: '1.5rem' }}
                                    >
                                      <div
                                        className='card-university'
                                        style={{
                                          backgroundColor: '#fff',
                                          borderRadius: '15px',
                                        }}
                                      >
                                        <div
                                          className='card-header'
                                          style={{
                                            padding: '1.5rem 1.5rem 0px',
                                            borderRadius: '15px  15px 0 0',
                                          }}
                                        >
                                          <h5>{list.name}</h5>
                                          <p
                                            style={{
                                              textAlign: 'left',
                                              marginTop: '0.5rem',
                                              marginBottom: '0.5rem',
                                            }}
                                          >
                                            จำนวน {list.data.length} โครงการ
                                          </p>
                                        </div>
                                        <div className='card-university-body'>
                                          {list.data.length ? (
                                            <div className='list'>
                                              {list.data
                                                .sort((x, y) =>
                                                  x.project_name_th.localeCompare(
                                                    y.project_name_th,
                                                    'th'
                                                  )
                                                )
                                                .map((listdata) => (
                                                  <div className='link_feature'>
                                                    <a
                                                      href={
                                                        listdata.project_id
                                                          ? `/monitoring/ProjectDetail/ProjectNetwork?project_id=${btoa(
                                                              listdata.project_id
                                                            )}`
                                                          : `/monitoring/ProjectDetailConcep/ProjectNetwork?concep_id=${btoa(
                                                              listdata.concept_id
                                                            )}`
                                                      }
                                                      className='linkexternal'
                                                    >
                                                      <Row
                                                        className='p-2 align-items-center justify-content-md-center '
                                                        style={{
                                                          width: '100%',
                                                        }}
                                                        data-bs-toggle='tooltip'
                                                        data-bs-placement='bottom'
                                                        title={
                                                          listdata.project_name_th
                                                        }
                                                      >
                                                        <Col md='2'>
                                                          <img
                                                            className='rounded-circle mx-auto d-block'
                                                            width={40}
                                                            height={40}
                                                            src={
                                                              parseInt(
                                                                listdata.project_type_id
                                                              ) === 1
                                                                ? `https://researcher.kims-rmuti.com/icon/R.jpg`
                                                                : parseInt(
                                                                    listdata.project_type_id
                                                                  ) === 2
                                                                ? `https://researcher.kims-rmuti.com/icon/AS.jpg`
                                                                : parseInt(
                                                                    listdata.project_type_id
                                                                  ) === 5
                                                                ? `https://researcher.kims-rmuti.com/icon/U2T.jpg`
                                                                : noImg
                                                            }
                                                          />
                                                        </Col>
                                                        <Col md='10'>
                                                          <text>
                                                            {
                                                              listdata.project_name_th
                                                            }
                                                          </text>
                                                        </Col>
                                                      </Row>
                                                    </a>
                                                  </div>
                                                ))}
                                            </div>
                                          ) : (
                                            <div className='list pt-4'>
                                              ไม่พบข้อมูล
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </Col>
                                  ))}
                              </>
                            ) : (
                              <div className='pt-4'>ไม่พบข้อมูล</div>
                            )}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                  <Col md={12} style={{ marginTop: '2rem' }}>
                    <Accordion
                      style={{ padding: '10px 25px 0 25px' }}
                      className='bg-title'
                      defaultActiveKey='0'
                    >
                      <Accordion.Item
                        eventKey='0'
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                        }}
                      >
                        <Accordion.Header>
                          <h2
                            style={{
                              textAlign: 'left',
                              color: '#fff',
                              fontWeight: '600',
                              marginBottom: '2rem',
                            }}
                          >
                            งานวิจัยเครือข่าย
                          </h2>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row style={{ paddingLeft: '1rem' }}>
                            {other_universitys.length ? (
                              <>
                                {other_universitys
                                  .sort((x, y) =>
                                    x.name.localeCompare(y.name, 'th')
                                  )
                                  .map((list) => (
                                    <Col
                                      xs
                                      sm={12}
                                      md
                                      lg={6}
                                      xl={6}
                                      xxl={4}
                                      style={{ paddingBottom: '1.5rem' }}
                                    >
                                      <div
                                        className='card-university'
                                        style={{
                                          backgroundColor: '#fff',
                                          borderRadius: '15px',
                                        }}
                                      >
                                        <div
                                          className='card-header'
                                          style={{
                                            padding: '1.5rem 1.5rem 0px',
                                            borderRadius: '15px  15px 0 0',
                                          }}
                                        >
                                          <h5>{list.name}</h5>
                                          <p
                                            style={{
                                              textAlign: 'left',
                                              marginTop: '0.5rem',
                                              marginBottom: '0.5rem',
                                            }}
                                          >
                                            จำนวน {list.data.length} โครงการ
                                          </p>
                                        </div>
                                        <div className='card-university-body'>
                                          {list.data.length ? (
                                            <div className='list'>
                                              {list.data
                                                .sort((x, y) =>
                                                  x.project_name_th.localeCompare(
                                                    y.project_name_th,
                                                    'th'
                                                  )
                                                )
                                                .map((listdata) => (
                                                  <div className='link_feature'>
                                                    <a
                                                      href={
                                                        listdata.project_id
                                                          ? `/monitoring/ProjectDetail/ProjectNetwork?project_id=${btoa(
                                                              listdata.project_id
                                                            )}`
                                                          : `/monitoring/ProjectDetailConcep/ProjectNetwork?concep_id=${btoa(
                                                              listdata.concept_id
                                                            )}`
                                                      }
                                                      className='linkexternal'
                                                    >
                                                      <Row
                                                        className='p-2 align-items-center justify-content-md-center '
                                                        style={{
                                                          width: '100%',
                                                        }}
                                                        data-bs-toggle='tooltip'
                                                        data-bs-placement='bottom'
                                                        title={
                                                          listdata.project_name_th
                                                        }
                                                      >
                                                        <Col md='2'>
                                                          <img
                                                            className='rounded-circle mx-auto d-block'
                                                            width={40}
                                                            height={40}
                                                            src={
                                                              parseInt(
                                                                listdata.project_type_id
                                                              ) === 1
                                                                ? `https://researcher.kims-rmuti.com/icon/R.jpg`
                                                                : parseInt(
                                                                    listdata.project_type_id
                                                                  ) === 2
                                                                ? `https://researcher.kims-rmuti.com/icon/AS.jpg`
                                                                : parseInt(
                                                                    listdata.project_type_id
                                                                  ) === 5
                                                                ? `https://researcher.kims-rmuti.com/icon/U2T.jpg`
                                                                : noImg
                                                            }
                                                          />
                                                        </Col>
                                                        <Col md='10'>
                                                          <text>
                                                            {listdata.project_name_th.replace(
                                                              /(.{30})..+/,
                                                              '$1…'
                                                            )}
                                                          </text>
                                                        </Col>
                                                      </Row>
                                                    </a>
                                                  </div>
                                                ))}
                                            </div>
                                          ) : (
                                            <div className='list pt-4'>
                                              ไม่พบข้อมูล
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </Col>
                                  ))}
                              </>
                            ) : (
                              <div className='pt-4'>ไม่พบข้อมูล</div>
                            )}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageProject);
