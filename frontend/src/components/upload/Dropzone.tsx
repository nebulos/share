import { Button, Center, createStyles, Group, Text } from "@mantine/core";
import { Dropzone as MantineDropzone } from "@mantine/dropzone";
import { ForwardedRef, useRef } from "react";
import { TbCloudUpload, TbUpload } from "react-icons/tb";
import { FormattedMessage } from "react-intl";
import useTranslate from "../../hooks/useTranslate.hook";
import { FileUpload } from "../../types/File.type";
import { byteToHumanSizeString } from "../../utils/fileSize.util";
import toast from "../../utils/toast.util";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  // Glassmorphic dropzone in dark mode: translucent indigo, backdrop blur,
  // violet hairline. Falls back to subtle defaults in light mode.
  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
    ...(theme.colorScheme === "dark"
      ? {
          backgroundColor: "rgba(70, 80, 158, 0.06)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderColor: theme.colors.nebulos[7],
          "&:hover": {
            backgroundColor: "rgba(124, 102, 220, 0.08)",
            borderColor: theme.colors.nebulos[5],
          },
        }
      : {}),
  },

  // Violet cloud-upload icon in dark mode (was a desaturated grey).
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.nebulos[5]
        : theme.colors.gray[4],
  },

  // Title in italic Newsreader for the primary "Upload files" line — picks
  // up theme.headings.fontFamily.
  title: {
    fontFamily: theme.headings.fontFamily,
    fontStyle: "italic",
    fontWeight: 500,
    letterSpacing: "0.005em",
  },

  control: {
    position: "absolute",
    bottom: -20,
  },
}));

const Dropzone = ({
  title,
  isUploading,
  maxShareSize,
  onFilesChanged,
}: {
  title?: string;
  isUploading: boolean;
  maxShareSize: number;
  onFilesChanged: (files: FileUpload[]) => void;
}) => {
  const t = useTranslate();

  const { classes } = useStyles();
  const openRef = useRef<() => void>();
  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        onReject={(e) => {
          toast.error(e[0].errors[0].message);
        }}
        disabled={isUploading}
        openRef={openRef as ForwardedRef<() => void>}
        onDrop={(files: FileUpload[]) => {
          const fileSizeSum = files.reduce((n, { size }) => n + size, 0);

          if (fileSizeSum > maxShareSize) {
            toast.error(
              t("upload.dropzone.notify.file-too-big", {
                maxSize: byteToHumanSizeString(maxShareSize),
              }),
            );
          } else {
            files = files.map((newFile) => {
              newFile.uploadingProgress = 0;
              return newFile;
            });
            onFilesChanged(files);
          }
        }}
        className={classes.dropzone}
        radius="md"
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <TbCloudUpload size={50} className={classes.icon} />
          </Group>
          <Text
            align="center"
            size="xl"
            mt="xl"
            className={classes.title}
          >
            {title || <FormattedMessage id="upload.dropzone.title" />}
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            <FormattedMessage
              id="upload.dropzone.description"
              values={{ maxSize: byteToHumanSizeString(maxShareSize) }}
            />
          </Text>
        </div>
      </MantineDropzone>
      <Center>
        <Button
          className={classes.control}
          variant="light"
          size="sm"
          radius="xl"
          disabled={isUploading}
          onClick={() => openRef.current && openRef.current()}
        >
          {<TbUpload />}
        </Button>
      </Center>
    </div>
  );
};
export default Dropzone;
