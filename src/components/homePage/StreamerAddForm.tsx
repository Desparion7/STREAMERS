/* eslint-disable jsx-a11y/control-has-associated-label */
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState, useRef } from 'react';
import { FormValues } from '../../interface/form-interface';
import { useAddStreamerMutation } from '../../app/slice/streamersApiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import styles from './StreamerAddForm.module.scss';

const StreamerAddForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<null | File>();
  const [addNewStreamer, { isSuccess, isLoading, isError, error }] =
    useAddStreamerMutation();

  // Function to validate form
  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.name) {
      errors.name = 'Required field';
    }
    if (values.name.length > 20) {
      errors.name = 'Streamer name can only have 20 characters';
    }
    if (!values.platform) {
      errors.platform = 'Required field';
    }
    if (!values.description) {
      errors.description = 'Required field';
    }
    if (values.description.trim().length > 350) {
      errors.description = 'Description is too long, maximum 150 characters';
    }
    return errors;
  };
  // Function to add new streamer
  const sendMessageHandler = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    await addNewStreamer({
      name: values.name,
      platform: values.platform,
      description: values.description,
      photo: selectedFile as File,
    });
    actions.setSubmitting(false);
    actions.resetForm();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`${styles.streamerAddForm} containter gradient__bg`}>
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{
          name: '',
          platform: 'Twitch',
          description: '',
        }}
        validate={validateForm}
        onSubmit={sendMessageHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="gradient__text">Add New Streamer</h2>
            <label htmlFor="name">Streamer Name:</label>
            <Field
              type="name"
              id="name"
              name="name"
              className={errors.name && touched.name && styles.errorInput}
              placeholder={errors.name && touched.name ? errors.name : ''}
            />
            <label htmlFor="platform">Streaming Platform:</label>
            <Field as="select" id="platform" name="platform">
              <option defaultValue="Twitch">Twitch</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Kick">Kick</option>
              <option value="Rumble">Rumble</option>
            </Field>
            <label htmlFor="photo">Add images:</label>
            <input
              ref={inputRef}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const fileList = e.target.files;
                if (fileList) {
                  setSelectedFile(fileList[0]);
                }
              }}
            />
            <label htmlFor="description">Description:</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              maxLength={350}
              className={
                errors.description && touched.description && styles.errorInput
              }
              placeholder={
                errors.description && touched.description
                  ? errors.description
                  : ''
              }
            />
            {errors.description ===
              'Description is too long, maximum 150 characters' && (
              <ErrorMessage
                name="description"
                component="div"
                className={styles.errorText}
              />
            )}
            {errors.name === 'Streamer name can only have 20 characters' && (
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorText}
              />
            )}
            <button type="submit" className="orangeButton">
              Add Streamer
            </button>
            {isError && error && 'data' in error && (
              <div className="errorText">{error.data.message}</div>
            )}
            {isSuccess && (
              <div className="successText">
                New streamer added successfully!
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StreamerAddForm;
