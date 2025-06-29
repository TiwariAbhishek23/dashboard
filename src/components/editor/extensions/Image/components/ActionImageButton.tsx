'use client';

import { useMemo, useRef, useState } from 'react';

import { ActionButton, Button, Checkbox, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { ImageCropper } from '@/components/editor/extensions/Image/components/ImageCropper';
import { useLocale } from '@/locales';
import { actionDialogImage, useDialogImage } from '@/components/editor/extensions/Image/store';
import Image from '@/components/editor/extensions/Image/Image';

const ActionImageButton = (props: any) => {
  const { t } = useLocale();

  const dialogImage = useDialogImage();

  const [link, setLink] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  const [imageInline, setImageInline] = useState(false);

  const uploadOptions = useMemo(() => {
    const uploadOptions = props.editor.extensionManager.extensions.find(
      (extension: any) => extension.name === Image.name,
    )?.options;

    return uploadOptions;
  }, [props.editor]);

const handleFile = async (event: any) => {
    const files = event?.target?.files;
    if (!props.editor || props.editor.isDestroyed || files.length === 0) {
      return;
    }
    const file = files[0];

    let src = '';
    if (uploadOptions.upload) {
      src = await uploadOptions.upload(file);
    } else {
      src = URL.createObjectURL(file);
    }

    props.editor.chain().focus().setImageInline({ src, inline: imageInline }).run();
    actionDialogImage.setOpen(false);
    setImageInline(false);
  }
  const handleLink = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    props.editor.chain().focus().setImageInline({ src: link, inline: imageInline }).run();
    actionDialogImage.setOpen(false);
    setImageInline(false);
    setLink('');
  }

  const handleClick = (e: any) => {
    e.preventDefault();
    fileInput.current?.click();
  }

  return (
    <Dialog open={dialogImage} onOpenChange={actionDialogImage.setOpen}>
      <DialogTrigger asChild>
        <ActionButton
          icon={props.icon}
          action={() => actionDialogImage.setOpen(true)}
          tooltip={props.tooltip}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          {t('editor.image.dialog.title')}
        </DialogTitle>

        <Tabs
          defaultValue={
            uploadOptions.resourceImage === 'both' || uploadOptions.resourceImage === 'upload'
              ? 'upload'
              : 'link'
          }
          activationMode="manual"
        >
          <TabsList className="grid w-full grid-cols-2">
            {uploadOptions.resourceImage === 'both' || uploadOptions.resourceImage === 'upload'
              ? (
                <TabsTrigger value="upload">
                  {t('editor.image.dialog.tab.upload')}
                </TabsTrigger>
              )
              : <></>}
            {uploadOptions.resourceImage === 'both' || uploadOptions.resourceImage === 'link'
              ? (
                <TabsTrigger value="link">
                  {t('editor.image.dialog.tab.url')}
                </TabsTrigger>
              )
              : <></>}
          </TabsList>

          <div className="flex items-center gap-[4px] my-[10px]">
            <Checkbox
              checked={imageInline}
              onCheckedChange={(v) => {
                setImageInline(v as boolean);
              }}
            />
            <Label>
              {t('editor.link.dialog.inline')}
            </Label>
          </div>

          <TabsContent value="upload">
            <div className="flex items-center gap-[10px]">
              <Button className="w-full mt-1" size="sm" onClick={handleClick}>
                {t('editor.image.dialog.tab.upload')}
              </Button>
              <ImageCropper
                editor={props.editor}
                imageInline={imageInline}
                onClose={() => actionDialogImage.setOpen(false)}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              multiple
              style={{
                display: 'none',
              }}
              onChange={handleFile}
            />
          </TabsContent>
          <TabsContent value="link">
            <form onSubmit={handleLink}>
              <div className="flex items-center gap-2">
                <Input
                  type="url"
                  autoFocus
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  required
                  placeholder={t('editor.image.dialog.placeholder')}
                />
                <Button type="submit">
                  {t('editor.image.dialog.button.apply')}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default ActionImageButton;
