import { TestBed, inject } from '@angular/core/testing';

import { NgxAppMsgService } from './ngx-app-msg.service';
import { INgxAppMsg } from './interfaces';

describe('NgxAppMsgService', () => {
  let value: INgxAppMsg;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxAppMsgService]
    });
    service = TestBed.get(NgxAppMsgService);
    service.messages$.subscribe(val => value = val);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start off with null', () => {
    expect(value).toBe(null);
  });

  describe('show()', () => {
    it('should set the message', () => {
      service.show('success', 'foo');
      expect(value.context).toBe('success');
      expect(value.message).toBe('foo');
      expect(value.autohide).toBe(true);
    });
  });

  describe('wait()', () => {
    it('should set the message', () => {
      service.wait('foo');
      expect(value.context).toBe('wait');
      expect(value.message).toBe('foo');
      expect(value.autohide).toBe(false);
    });

  });
  describe('success()', () => {
    it('should set the message', () => {
      service.success('foo');
      expect(value.context).toBe('success');
      expect(value.message).toBe('foo');
      expect(value.autohide).toBe(true);
    });
  });

  describe('warn()', () => {
    it('should set the message', () => {
      service.warn('foo');
      expect(value.context).toBe('warn');
      expect(value.message).toBe('foo');
      expect(value.autohide).toBe(true);
    });
  });


  describe('hide()', () => {
    it('should set the val to null', () => {
      service.warn('foo');
      expect(value).not.toBe(null);
      service.hide();
      expect(value).toBe(null);
    });
  });

});
